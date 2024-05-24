import { MessageSquareText, MessagesSquare, MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AlunosTurmaType } from '../../../schemas/SchemaAlunosTurma'
import { NotificarResponsavelAluno } from '../../dialogs/envio-notificacao-aluno'
import { NotificacoesAluno } from '../../dialogs/notificacao-aluno-dialog'

interface MenuTabelaNotificacaoAlunosTurmaProps {
  dadosAluno: AlunosTurmaType
}

export function MenuTabelaNotificacaoAlunosTurma({
  dadosAluno,
}: MenuTabelaNotificacaoAlunosTurmaProps) {
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
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 justify-between gap-2"
            >
              <MessagesSquare />
              Mensagens enviadas
            </DropdownMenuItem>
          </DialogTrigger>
          <NotificacoesAluno idAluno={dadosAluno.id} />
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 justify-between gap-2"
            >
              <MessageSquareText />
              Enviar uma mensagem
            </DropdownMenuItem>
          </DialogTrigger>
          <NotificarResponsavelAluno aluno={dadosAluno} />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
