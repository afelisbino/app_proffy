'use client'

import { Button } from '@/components/ui/button'
import ListagemTurmasEscola from '../components/lists/ListagemTurmasEscola'
import { Pencil, Plus } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CadastroTurma } from '../components/dialogs/cadastro-turma'
import { useTurmaEscola } from '@/lib/use-case'
import { TabelaAlunos } from '../components/tables/Alunos/tabela-alunos'
import { EditarTurma } from '../components/dialogs/edicao-turma'

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
              Nova turma
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
              Editar turma
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
      <div className="flex-1">
        <TabelaAlunos data={[]} />
      </div>
    </div>
  )
}
