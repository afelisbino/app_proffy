'use client'

import { useQuery } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useTurmaEscola } from '@/lib/use-case'

import { buscarAlunosTurma, buscarTurmas } from '../api/turma'
import ListagemChamadaAlunos from '../components/lists/ListagemChamadaAlunos'
import ListagemTurmasEscola from '../components/lists/ListagemTurmasEscola'

export default function ChamadaAlunos() {
  const [turmaSelecionada] = useTurmaEscola()

  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscolaChamada'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const { data: alunosTurma, isLoading: carregandoAlunos } = useQuery({
    queryKey: ['listaAlunosTurmaNotificacao', turmaSelecionada.selected],
    queryFn: () => buscarAlunosTurma(turmaSelecionada.selected),
    enabled: !!turmaSelecionada.selected,
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
            <ListagemTurmasEscola listaTurmas={listaTurmas ?? []} />
          )}
          <Separator />
          <ListagemChamadaAlunos
            listaAlunosTurma={alunosTurma ?? []}
            carregandoAlunos={carregandoAlunos}
          />
        </section>
      </CardContent>
    </Card>
  )
}
