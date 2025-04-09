'use client'

import { MoreVertical, Pencil, Phone, Plus, Trash } from 'lucide-react'

import { DadosResponsaveisAluno } from '@/api/matricula'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { EdicaoResponsavelAluno } from '../../dialogs/edicao-responsavel'
import { ListaContatosResponsaveisDialog } from '../../dialogs/lista-contatos-responsavel'
import { NovosContatosResponsavelDialog } from '../../dialogs/novos-telefones-responsavel'
import { RemocaoVinculoResponsavelDialog } from '../../dialogs/remover-vinculo-responsavel'

interface MenuTabelaResponsavelProps {
  dadosResponsavel: DadosResponsaveisAluno
}

export function MenuTabelaResponsavel({
  dadosResponsavel,
}: MenuTabelaResponsavelProps) {
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
      <DropdownMenuContent align="start" className="w-[160px]">
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 gap-2"
            >
              <Phone className="size-4" />
              Contatos
            </DropdownMenuItem>
          </DialogTrigger>
          <ListaContatosResponsaveisDialog
            idAluno={dadosResponsavel.idAluno ?? ''}
            idResponsavel={dadosResponsavel.id}
            contatos={dadosResponsavel.TelefoneResponsavel}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 gap-2"
            >
              <Plus className="size-4" />
              Vincular contatos
            </DropdownMenuItem>
          </DialogTrigger>
          <NovosContatosResponsavelDialog
            idAluno={dadosResponsavel.idAluno ?? ''}
            idResponsavel={dadosResponsavel.id}
          />
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 gap-2"
            >
              <Pencil className="size-4" />
              Editar
            </DropdownMenuItem>
          </DialogTrigger>
          <EdicaoResponsavelAluno
            idAluno={dadosResponsavel.idAluno ?? ''}
            id={dadosResponsavel.id}
            nome={dadosResponsavel.nome}
            cpf={dadosResponsavel.cpf}
          />
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="flex-1 gap-2"
            >
              <Trash className="size-5" />
              Desvincular
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <RemocaoVinculoResponsavelDialog
            idAluno={dadosResponsavel.idAluno ?? ''}
            idResponsavel={dadosResponsavel.id}
          />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
