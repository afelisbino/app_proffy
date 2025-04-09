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

import { buscarModelosMensagens } from '@/api/message'
import { buscarAlunosTurma, buscarTurmas } from '@/api/turma'
import ListagemTurmasEscola, {
    useTurmaEscola,
} from '@/components/lists/ListagemTurmasEscola'
import { TabelaNotificacaoAlunosTurma } from '@/components/tables/NotificacoesTurmas/tabela-alunos-turma'

export default function Notificacoes() {
  const [turmaSelecionada] = useTurmaEscola()

  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscolaNotificacao'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const { data: alunosTurma, isLoading: carregandoAlunos } = useQuery({
    queryKey: ['listaAlunosTurmaNotificacao', turmaSelecionada.selected],
    queryFn: () => buscarAlunosTurma(turmaSelecionada.selected),
    enabled: !!turmaSelecionada.selected,
  })

  useQuery({
    queryKey: ['modelosNotificacoes'],
    queryFn: () => buscarModelosMensagens(),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription>
          Área para visualizar e enviar notificações aos responsáveis dos alunos
          da turma
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
          <TabelaNotificacaoAlunosTurma
            data={alunosTurma ?? []}
            isLoading={carregandoAlunos}
          />
        </section>
      </CardContent>
    </Card>
  )
}
