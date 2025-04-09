'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { buscarAlunosTurma, buscarTurmas } from '@/api/turma'
import { FormChamadaAlunos } from '@/components/forms/Turma/FormChamadaTurma'
import { ptBR } from 'date-fns/locale'

export default function PageChamada() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [openFilterTurma, setOpenFilterTurma] = useState(false)
  const [turmaSelecionada, setTurma] = useState<string>('')

  const { data: listaTurmas, isFetching: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscolaChamada'],
    queryFn: buscarTurmas,
    initialData: [],
  })

  const { data: alunosTurma, isFetching: carregandoAlunos } = useQuery({
    queryKey: ['listaAlunosTurmaNotificacao', turmaSelecionada],
    queryFn: () => buscarAlunosTurma(turmaSelecionada),
    enabled: !!turmaSelecionada,
    initialData: [],
  })

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-4 md:justify-between md:flex-row md:space-y-0">
        <div>
          <CardTitle>Chamada diária</CardTitle>
          <CardDescription>
            Área para realizar chamada do dia de cada turma
          </CardDescription>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-auto justify-start text-left font-normal gap-2',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP", {
                locale: ptBR
              }) : <span>Seleciona uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <section className="grid space-y-4">
          {carregandoTurmas ? (
            <Skeleton className="h-4 w-full rounded" />
          ) : (
            <Select
              onOpenChange={setOpenFilterTurma}
              onValueChange={setTurma}
              value={turmaSelecionada}
              open={openFilterTurma}
              disabled={carregandoTurmas}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Turmas</SelectLabel>
                  {listaTurmas?.map((turma) => {
                    return (
                      <SelectItem key={turma.id} value={turma.id}>
                        {turma.nome}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {alunosTurma && alunosTurma.length > 0 && (
            <>
              <Separator />
              <FormChamadaAlunos
                dataChamada={date ?? new Date()}
                listaAlunosTurma={alunosTurma}
                carregandoAlunos={carregandoAlunos}
              />
            </>
          )}
        </section>
      </CardContent>
    </Card>
  )
}
