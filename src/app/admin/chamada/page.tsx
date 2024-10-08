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

import { buscarAlunosTurma, buscarTurmas } from '../api/turma'
import { FormChamadaAlunos } from '../components/forms/Turma/FormChamadaTurma'

export default function PageChamada() {
  const [openFilterTurma, setOpenFilterTurma] = useState(false)
  const [turmaSelecionada, setTurma] = useState<string>('')

  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscolaChamada'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const { data: alunosTurma, isLoading: carregandoAlunos } = useQuery({
    queryKey: ['listaAlunosTurmaNotificacao', turmaSelecionada],
    queryFn: () => buscarAlunosTurma(turmaSelecionada),
    enabled: !!turmaSelecionada,
    staleTime: 0,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chamada diária</CardTitle>
        <CardDescription>
          Área para realizar chamada do dia de cada turma
        </CardDescription>
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
