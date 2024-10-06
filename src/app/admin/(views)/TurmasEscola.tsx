'use client'

import { useQuery } from '@tanstack/react-query'
import { Pencil, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useTurmaEscola } from '@/lib/use-case'

import { buscarAlunosTurma, buscarTurmas } from '../api/turma'
import { CadastroTurma } from '../components/dialogs/cadastro-turma'
import { EditarTurma } from '../components/dialogs/edicao-turma'
import ListagemTurmasEscola from '../components/lists/ListagemTurmasEscola'
import { TabelaAlunos } from '../components/tables/Alunos/tabela-alunos'

export default function TurmasEscola() {
  const [turmaSelecionada] = useTurmaEscola()

  const { data: listaTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscola'],
    queryFn: buscarTurmas,
    staleTime: Infinity,
  })

  const { data: alunosTurma, isLoading: carregandoAlunos } = useQuery({
    queryKey: ['listaAlunosTurma', turmaSelecionada.selected],
    queryFn: () => buscarAlunosTurma(turmaSelecionada.selected),
    enabled: !!turmaSelecionada.selected,
    staleTime: Infinity,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Turmas escolares</CardTitle>
        <CardDescription>
          Área para gerenciar turmas e alunos, como novas matriculas e
          transferencias de alunos para outra turma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-2">
            {carregandoTurmas ? (
              <Skeleton className="h-4 w-full rounded" />
            ) : (
              <ListagemTurmasEscola listaTurmas={listaTurmas ?? []} />
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={'default'}
                  disabled={carregandoTurmas}
                  className="w-full shadow gap-2"
                >
                  <Plus />
                  Turma
                </Button>
              </DialogTrigger>
              <CadastroTurma />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={'default'}
                  className="w-full shadow gap-2"
                  disabled={!turmaSelecionada.selected}
                >
                  <Pencil />
                  Editar
                </Button>
              </DialogTrigger>
              <EditarTurma
                turma={
                  listaTurmas?.find(
                    (turma) => turmaSelecionada.selected === turma.id,
                  ) ?? {
                    id: '',
                    nome: '',
                  }
                }
              />
            </Dialog>
          </div>
          <Separator />
          <div className="flex-1 pb-10">
            <TabelaAlunos
              data={alunosTurma ?? []}
              isLoading={carregandoAlunos}
              idTurma={turmaSelecionada.selected}
            />
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
