import { MoreVertical } from 'lucide-react'

import { ModeloMensagensType } from '@/app/admin/schemas/SchemaMensagemAlunos'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MenuTabelaModeloProps {
  row: ModeloMensagensType
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              Editar modelo
            </DropdownMenuItem>
          </DialogTrigger>
        </Dialog>
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
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
