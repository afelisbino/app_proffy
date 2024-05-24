'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { MessageSquareShare } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AlunosTurmaType } from '../../../schemas/SchemaAlunosTurma'
import { NotificarResponsavelAluno } from '../../dialogs/envio-notificacao-aluno'

import { colunasTabelaNotificacaoAlunosTurma } from './colunas-tabela-alunos-turma'

interface DataTableNotificacaoAlunosTurmaProps {
  data: Array<AlunosTurmaType>
  isLoading: boolean
}

export function TabelaNotificacaoAlunosTurma({
  data,
  isLoading,
}: DataTableNotificacaoAlunosTurmaProps) {
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns: colunasTabelaNotificacaoAlunosTurma,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-row items-center justify-center md:justify-between py-4 gap-2 md:py-0 md:gap-0">
        <Input
          placeholder="Filtrar pelo nome do aluno..."
          className="w-full md:w-64"
          disabled={data?.length === 0}
          value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nome')?.setFilterValue(event.target.value)
          }
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-app-orange-500 hover:bg-app-orange-600 text-background shadow gap-2"
              disabled={table.getSelectedRowModel().rows.length === 0}
            >
              <MessageSquareShare />
              Enviar mensagem
            </Button>
          </DialogTrigger>
          <NotificarResponsavelAluno
            alunos={table
              .getSelectedRowModel()
              .rows.map((selecionado) => selecionado.original)}
          />
        </Dialog>
      </div>
      <div className="rounded-md border shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={colunasTabelaNotificacaoAlunosTurma.length}
                  >
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={colunasTabelaNotificacaoAlunosTurma.length}
                  >
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={colunasTabelaNotificacaoAlunosTurma.length}
                  >
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
              </>
            ) : table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colunasTabelaNotificacaoAlunosTurma.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhum aluno encontrado!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
