'use client'

import { useQuery } from "@tanstack/react-query"
import React from "react"
import { buscaListaFrequenciaTurma } from "@/api/relatorios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { turmaType } from "@/api/turma"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TabelaAlunosAusentes } from "@/components/tables/ConfirmacaoChamada/tabela-alunos-ausentes"

const dataAtual = new Date()

interface RelatorioHistoricoFrequenciaProps {
  listaTurmas: Array<turmaType>
  buscandoTurmas: boolean
}
export default function HistoricoFrequencia({ listaTurmas, buscandoTurmas }: RelatorioHistoricoFrequenciaProps) {

  const [openFilterTurma, setOpenFilterTurma] = React.useState(false)
  const [turmaSelecionada, setTurma] = React.useState<string>(listaTurmas[0]?.id)

  const [date, setDate] = React.useState<Date | undefined>(new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate()))

  const estatisticasHistoricoFrequencia = useQuery({
    queryKey: ['historicoFrequencia', turmaSelecionada, date],
    queryFn: () => buscaListaFrequenciaTurma({
      idTurma: turmaSelecionada,
      inicio: date ?? new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate())
    }),
    enabled: !!turmaSelecionada,
    initialData: []
  })

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>Relatório de frequência</CardTitle>
          <CardDescription>Histórico de frequência de alunos por turma</CardDescription>
        </div>
        <div>
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
                <p>Filtro de histórico de frequencia</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-full overflow-auto h-[300px] md:h-auto">
              <div className="grid gap-2">
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
                <Calendar
                  className="border rounded-sm capitalize"
                  initialFocus
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <TabelaAlunosAusentes
          data={estatisticasHistoricoFrequencia.data}
          isLoading={estatisticasHistoricoFrequencia.isFetching}
        />
      </CardContent>
    </Card>
  )
}