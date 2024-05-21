import { MoreVertical } from 'lucide-react'

import { UsuarioType } from '@/app/admin/schemas/SchemaUsuariosEscola'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ConfirmaAlteracaoStatusUsuarioDialog } from '../../dialogs/ConfirmaAlteraStatusDialog'

interface MenuTabelaUsuarioProps {
  row: UsuarioType
}

export function MenuTabelaUsuario({ row }: MenuTabelaUsuarioProps) {
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
              {row.status ? 'Desativar usuário' : 'Ativar usuário'}
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <ConfirmaAlteracaoStatusUsuarioDialog
            idUsuario={row.id}
            statusUsuario={row.status}
          />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
