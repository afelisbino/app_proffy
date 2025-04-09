import { MoreVertical } from 'lucide-react'

import { ModeloMensagensType } from '@/schemas/SchemaMensagemAlunos'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmacaoExcluirModeloDialog } from '@/components/dialogs/ExcluirModeloDialog'


interface MenuTabelaModeloProps {
  row: ModeloMensagensType
}

export function MenuTabelaModelo({ row }: MenuTabelaModeloProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
            >
              Excluir modelo
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <ConfirmacaoExcluirModeloDialog id={row.id} assunto={row.assunto} />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
