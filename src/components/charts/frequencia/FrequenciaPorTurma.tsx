'use client'

import { ptBR } from 'date-fns/locale'
import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { mascararNome } from '@/lib/utils'
import { buscaEstatisticasFrequenciaAlunos } from '@/api/relatorios'
import { turmaType } from '@/api/turma'

interface RelatorioFrequenciaEscolarProps {
  listaTurmas: Array<turmaType>
  buscandoTurmas: boolean
}

const dataAtual = new Date()
export function ChartFrequenciaTurma({
  listaTurmas,
  buscandoTurmas,
}: RelatorioFrequenciaEscolarProps) {

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
          aluno: mascararNome(aluno.Aluno),
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
      <CardHeader className="flex flex-row justify-between">
      <div className="space-y-2">
          <CardTitle>Relatório de frequência</CardTitle>
          <CardDescription>Estatísticas de frequência escolar</CardDescription>
        </div>
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  className="rounded-full shadow"
                >
                  <Filter className="size-5" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filtro de frequencia da turma</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-full overflow-auto h-[300px] md:h-auto">
            <div className="grid gap-2">
              <div>
                <Select
                  onOpenChange={setOpen}
                  onValueChange={setTurma}
                  value={turmaSelecionada}
                  open={open}
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
              <Calendar
                className="border rounded-sm"
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={ptBR}
              />
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
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
