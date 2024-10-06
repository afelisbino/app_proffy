'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { buscaEstatisticasFrequenciaAlunos } from '@/app/admin/api/relatorios'
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

export function ChartFrequenciaTurma({
  listaTurmas,
  buscandoTurmas,
}: RelatorioFrequenciaEscolarProps) {
  const dataAtual = new Date()

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
    to: dataAtual,
  })

  const [open, setOpen] = React.useState(false)
  const [turmaSelecionada, setTurma] = React.useState<string>('')
  const [dadosGrafico, setDadosGrafico] = React.useState<
    Array<{
      aluno: string
      faltas: number
    }>
  >([])

  const chartConfig = {
    falta: {
      label: 'Faltas',
      color: '#e03322',
    },
  } satisfies ChartConfig

  async function buscaRelatorio(inicio: Date, fim: Date, turma: string) {
    const relatorioFrequencia = await buscaEstatisticasFrequenciaAlunos({
      inicio,
      fim,
      idTurma: turma,
    })

    setDadosGrafico(
      relatorioFrequencia.map((aluno) => {
        return {
          aluno: aluno.Aluno,
          faltas: aluno.TotalFaltas,
        }
      }),
    )
  }

  useEffect(() => {
    if (turmaSelecionada && date && date.from && date.to) {
      buscaRelatorio(date.from, date.to, turmaSelecionada)
    }
  }, [turmaSelecionada, date])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de frequência</CardTitle>
        <CardDescription>Estatísticas de frequência escolar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[250px] justify-start text-left font-normal',
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
            <Select
              onOpenChange={setOpen}
              onValueChange={setTurma}
              value={turmaSelecionada}
              open={open}
              disabled={buscandoTurmas}
            >
              <SelectTrigger className="w-[200px]">
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
            <Bar dataKey="faltas" fill="var(--color-falta)" radius={8}>
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
