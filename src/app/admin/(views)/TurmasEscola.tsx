'use client'

import { Pencil, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useTurmaEscola } from '@/lib/use-case'

import { CadastroTurma } from '../components/dialogs/cadastro-turma'
import { EditarTurma } from '../components/dialogs/edicao-turma'
import ListagemTurmasEscola from '../components/lists/ListagemTurmasEscola'
import { TabelaAlunos } from '../components/tables/Alunos/tabela-alunos'

export default function TurmasEscola() {
  const [turmaSelecionada] = useTurmaEscola()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-2">
        <ListagemTurmasEscola />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'default'} className="w-full shadow gap-2">
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
            turma={{
              id: '856',
              nome: 'Turma x',
            }}
          />
        </Dialog>
      </div>
      <Separator />
      <div className="flex-1">
        <TabelaAlunos data={[]} />
      </div>
    </div>
  )
}
