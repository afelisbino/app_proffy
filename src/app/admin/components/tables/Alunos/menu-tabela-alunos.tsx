import { ArrowRightLeft, MoreVertical, Trash } from 'lucide-react'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AlunosTurmaType } from '../../../schemas/SchemaAlunosTurma'
import { ConfirmacaoExcluirAlunoDialog } from '../../dialogs/remover-aluno'
import { DialogTransferenciaAluno } from '../../dialogs/transferencia-alunos'

interface MenuTabelaAlunoProps {
  dadosAluno: AlunosTurmaType
}

export function MenuTabelaAluno({ dadosAluno }: MenuTabelaAlunoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 justify-between gap-2"
            >
              <Trash />
              Excluir matrícula
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <ConfirmacaoExcluirAlunoDialog
            idAluno={dadosAluno.id}
            idTurma={dadosAluno.idTurma}
          />
        </AlertDialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 justify-between gap-2"
            >
              <ArrowRightLeft />
              Transferir aluno de turma
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTransferenciaAluno
            turmaAntiga={dadosAluno.idTurma}
            idAluno={dadosAluno.id}
          />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
