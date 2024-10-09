'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { buscarListaDisciplinas } from '@/app/admin/api/escola'
import { buscarRelatorioAvaliacaoAlunos } from '@/app/admin/api/relatorios'
import { turmaType } from '@/app/admin/api/turma'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface RelatorioFrequenciaEscolarProps {
  listaTurmas: Array<turmaType>
  buscandoTurmas: boolean
}

export function ChartAvalicoesTurma({
  listaTurmas,
  buscandoTurmas,
}: RelatorioFrequenciaEscolarProps) {
  const dataAtual = new Date()

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
    to: dataAtual,
  })

  const [openFilterTurma, setOpenFilterTurma] = React.useState(false)
  const [turmaSelecionada, setTurma] = React.useState<string>('')

  const [openFilterDisciplina, setOpenFilterDisciplina] = React.useState(false)
  const [disciplinaSelecionada, setDisciplina] = React.useState<string>('')

  const [openFilterPeriodo, setOpenFilterPeriodo] = React.useState(false)
  const [tipoPeriodoSelecionado, setTipoPeriodo] =
    React.useState<string>('bimestral')
  const [periodo, setPeriodo] = React.useState<number>(1)

  const [dadosGrafico, setDadosGrafico] = React.useState<
    Array<{
      aluno: string
      nota: number
      categoria: 'acima' | 'abaixo' | 'media'
      fill: string
    }>
  >([])

  const listaDisciplina = useQuery({
    queryKey: ['listaDisciplinas'],
    queryFn: buscarListaDisciplinas,
  })

  const chartConfig = {
    nota: {
      label: 'Nota',
    },
    abaixo: {
      label: 'Média',
      color: '#e03322',
    },
    media: {
      label: 'Média',
      color: '#f28705',
    },
    acima: {
      label: 'Média',
      color: '#28a745',
    },
  } satisfies ChartConfig

  async function buscaRelatorio(
    inicio: Date,
    fim: Date,
    turma: string,
    disciplina: string,
  ) {
    const relatorioAvaliacao = await buscarRelatorioAvaliacaoAlunos({
      inicio,
      fim,
      idTurma: turma,
      idDisciplina: disciplina,
      periodo,
      tipoPeriodo: tipoPeriodoSelecionado,
    })

    const getCategoriaNota = (nota: number) => {
      if (nota > 6) {
        return 'acima'
      } else if (nota === 6) {
        return 'media'
      } else {
        return 'abaixo'
      }
    }

    const getCorCategoria = (nota: number) => {
      if (nota > 6) {
        return '#28a745'
      } else if (nota === 6) {
        return '#f28705'
      } else {
        return '#e03322'
      }
    }

    setDadosGrafico(
      relatorioAvaliacao.map((aluno) => {
        return {
          aluno: aluno.Aluno,
          nota: aluno.Media,
          categoria: getCategoriaNota(aluno.Media),
          fill: getCorCategoria(aluno.Media),
        }
      }),
    )
  }

  useEffect(() => {
    if (
      disciplinaSelecionada &&
      turmaSelecionada &&
      periodo > 0 &&
      date &&
      date.from &&
      date.to
    ) {
      buscaRelatorio(
        date.from,
        date.to,
        turmaSelecionada,
        disciplinaSelecionada,
      )
    }
  }, [
    turmaSelecionada,
    disciplinaSelecionada,
    date,
    tipoPeriodoSelecionado,
    periodo,
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de avaliações</CardTitle>
        <CardDescription>Estatísticas avaliativas da turma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <Select
              onOpenChange={setOpenFilterPeriodo}
              onValueChange={setTipoPeriodo}
              value={tipoPeriodoSelecionado}
              open={openFilterPeriodo}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="bimestral">Bimestral</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              onOpenChange={setOpenFilterTurma}
              onValueChange={setTurma}
              value={turmaSelecionada}
              open={openFilterTurma}
              disabled={buscandoTurmas}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Turmas</SelectLabel>
                  {listaTurmas.map((turma) => {
                    return (
                      <SelectItem key={turma.id} value={turma.id}>
                        {turma.nome}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              onOpenChange={setOpenFilterDisciplina}
              onValueChange={setDisciplina}
              value={disciplinaSelecionada}
              open={openFilterDisciplina}
              disabled={listaDisciplina.isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma disciplina" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Disciplinas</SelectLabel>
                  {listaDisciplina.data?.map((disciplina) => {
                    return (
                      <SelectItem key={disciplina.id} value={disciplina.id}>
                        {disciplina.nome}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-auto justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y', {
                          locale: ptBR,
                        })}{' '}
                        -{' '}
                        {format(date.to, 'LLL dd, y', {
                          locale: ptBR,
                        })}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y', {
                        locale: ptBR,
                      })
                    )
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Input
              type="number"
              placeholder="Periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.valueAsNumber)}
            />
          </div>
        </div>

        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dadosGrafico}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="aluno"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="nota" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
