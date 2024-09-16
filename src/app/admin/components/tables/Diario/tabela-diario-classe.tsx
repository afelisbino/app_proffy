'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import React from 'react'

import { registroNotasTurma } from '@/app/admin/schemas/SchemaDiarioClasse'
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { DiarioTurmaDialog } from '../../dialogs/diario-turma'

import { colunasTabelaDiarioClasse } from './colunas-tabela-diario-classe'

interface TabelaDiarioClasseProps {
  data: Array<registroNotasTurma>
  isLoading: boolean
  idTurma: string | null
}

export function TabelaDiarioClasse({
  data,
  isLoading,
  idTurma,
}: TabelaDiarioClasseProps) {
  const table = useReactTable({
    data,
    columns: colunasTabelaDiarioClasse,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-2 w-full h-full">
      <div className="flex flex-col md:flex-row gap-2 md:justify-between">
        <div className="flex gap-2">
          <Input
            placeholder="Filtrar pelo nome do aluno..."
            className="w-full md:w-64"
            disabled={data?.length === 0}
            value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('nome')?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="flex flex-row gap-2">
          <Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    className="bg-app-red-500 hover:bg-app-red-600 shadow text-background gap-2 p-2 w-full"
                    size={'icon'}
                  >
                    <Plus className="size-5 hidden md:flex" />
                    <span className="flex md:hidden">Registrar diario</span>
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <DiarioTurmaDialog />
            </Dialog>
            <TooltipContent side="bottom" sideOffset={5}>
              Registrar notas da disciplina no diario
            </TooltipContent>
          </Tooltip>
        </div>
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
                  <TableCell colSpan={colunasTabelaDiarioClasse.length}>
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={colunasTabelaDiarioClasse.length}>
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={colunasTabelaDiarioClasse.length}>
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
                  colSpan={colunasTabelaDiarioClasse.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhum registro encontrado!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="enabled:shadow-md"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Voltar
        </Button>
        <Button
          className="enabled:shadow-md"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
