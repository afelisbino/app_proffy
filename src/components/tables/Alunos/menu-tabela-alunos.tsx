'use client'

import {
  ArrowRightLeft,
  BookUser,
  Megaphone,
  MegaphoneOff,
  MoreVertical,
  Trash,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AlunosTurmaType } from '@/schemas/SchemaAlunosTurma'
import { AlteracaoStatusNotificacaoAlunoDialog } from '@/components/dialogs/alteracao-status-notificacao'
import { ConfirmacaoExcluirAlunoDialog } from '@/components/dialogs/remover-aluno'
import { DialogTransferenciaAluno } from '@/components/dialogs/transferencia-alunos'

interface MenuTabelaAlunoProps {
  dadosAluno: AlunosTurmaType
}

export function MenuTabelaAluno({ dadosAluno }: MenuTabelaAlunoProps) {
  const router = useRouter()

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
      <DropdownMenuContent align="end" className="w-[250px]">
        <DropdownMenuItem
          onClick={() => {
            router.push(`turmas/aluno/${dadosAluno.id}`)
          }}
          className="gap-2"
        >
          <BookUser className="size-5" />
          Visualizar matrícula
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="gap-2"
            >
              <Trash className="size-5" />
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
              className=" gap-2"
            >
              <ArrowRightLeft className="size-5" />
              Transferir aluno de turma
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTransferenciaAluno
            turmaAntiga={dadosAluno.idTurma}
            idAluno={dadosAluno.id}
          />
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className=" gap-2"
            >
              {dadosAluno.notificacaoBloqueado ? (
                <MegaphoneOff className="size-5" />
              ) : (
                <Megaphone className="size-5" />
              )}
              {dadosAluno.notificacaoBloqueado
                ? 'Desbloquear notificação'
                : 'Bloquear notificação'}
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlteracaoStatusNotificacaoAlunoDialog
            idTurma={dadosAluno.idTurma}
            descricacaoAlerta={`Deseja realmente ${dadosAluno.notificacaoBloqueado ? 'desbloquear notificações' : 'bloquear notificações'} deste aluno?`}
            idAluno={dadosAluno.id}
            statusNotificacaoAtual={dadosAluno.notificacaoBloqueado}
            tituloAlerta={'Confirma está ação?'}
          />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
