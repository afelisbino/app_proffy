'use client'

import { MoreVertical, Trash } from 'lucide-react'

import { ConteudosAulaTurmaType } from '@/schemas/SchemaDiarioClasse'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmacaoExcluirConteudoAulaDialog } from '@/components/dialogs/remover-conteudo'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface MenuTabelaNotasAlunoProps {
  dadosConteudo: ConteudosAulaTurmaType
}

export function MenuTabelaConteudoAula({
  dadosConteudo,
}: MenuTabelaNotasAlunoProps) {
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
      <DropdownMenuContent align="end" className="w-auto">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className=" gap-2"
            >
              <Trash className="size-4" />
              Remover conteúdo
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <ConfirmacaoExcluirConteudoAulaDialog idConteudo={dadosConteudo.id} idTurma={dadosConteudo.idTurma}/>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
