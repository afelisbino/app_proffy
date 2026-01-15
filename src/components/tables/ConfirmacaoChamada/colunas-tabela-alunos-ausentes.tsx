'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Check, X } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { AlunoAusentesType } from '@/schemas/SchemaAlunosAusentes'
import { mascararNome } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ConfirmarAlteracaoPresencaDialog } from '@/components/dialogs/confirmar-alteracao-presenca'

function AcoesPresenca({ aluno }: { aluno: AlunoAusentesType }) {
  const [dialogState, setDialogState] = useState<{
    open: boolean
    novaPresenca: boolean
  }>({
    open: false,
    novaPresenca: false,
  })

  const handleAbrirDialog = (novaPresenca: boolean) => {
    setDialogState({ open: true, novaPresenca })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Alterar presença</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleAbrirDialog(true)}
            disabled={aluno.presenca}
            className="cursor-pointer"
          >
            <Check className="mr-2 h-4 w-4 text-green-600" />
            Marcar como presente
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleAbrirDialog(false)}
            disabled={!aluno.presenca}
            className="cursor-pointer"
          >
            <X className="mr-2 h-4 w-4 text-red-600" />
            Marcar como ausente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmarAlteracaoPresencaDialog
        idChamada={aluno.id}
        presencaAtual={aluno.presenca}
        novaPresenca={dialogState.novaPresenca}
        nomeAluno={aluno.nome}
        open={dialogState.open}
        onOpenChange={(open) => setDialogState({ ...dialogState, open })}
      />
    </>
  )
}

export const colunasTabelaAlunosAusente: ColumnDef<AlunoAusentesType>[] = [
  {
    accessorKey: 'nome',
    header: 'Aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-96 capitalize">{mascararNome(row.original.nome)}</div>
    ),
  },
  {
    accessorKey: 'dataChamada',
    header: 'Data',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const dataChamada = row.original.dataChamada && new Date(row.original.dataChamada)

      return (
        <span className="w-auto">{
          dataChamada && format(
            new Date(dataChamada.getFullYear(), dataChamada.getMonth(), dataChamada.getDate() + 1), 'P', {
            locale: ptBR,
          })
        }</span>
      )
    },
  },
  {
    accessorKey: 'presenca',
    header: 'Presente',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <Badge
        variant={row.original.presenca ? 'default' : 'destructive'}
        className={
          row.original.presenca
            ? 'bg-green-100 text-green-800 hover:bg-green-200'
            : 'bg-red-100 text-red-800 hover:bg-red-200'
        }
      >
        {row.original.presenca ? (
          <>
            <Check className="mr-1 h-3 w-3" />
            Presente
          </>
        ) : (
          <>
            <X className="mr-1 h-3 w-3" />
            Ausente
          </>
        )}
      </Badge>
    ),
  },
  {
    id: 'acoes',
    header: 'Ações',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <AcoesPresenca aluno={row.original} />,
  },
]
