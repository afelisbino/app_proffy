'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CheckCheck, Trash } from 'lucide-react'
import { colunasTabelaAlunosAusente } from './colunas-tabela-alunos-ausentes'
import { AlunoAusentesType } from '../../../schemas/SchemaAlunosAusentes'
import React from 'react'

interface TabelaAlunosAusentesProps {
  data: AlunoAusentesType[]
}

export function TabelaAlunosAusentes({ data }: TabelaAlunosAusentesProps) {
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns: colunasTabelaAlunosAusente,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input
          placeholder="Filtrar pelo nome do aluno..."
          className="w-full lg:w-48"
          disabled={data?.length === 0}
          value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nome')?.setFilterValue(event.target.value)
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button className="flex justify-center lg:justify-between gap-2 w-full bg-app-green-500 hover:bg-app-green-600 shadow">
            <CheckCheck className="flex md:hidden" />
            Confirmar
          </Button>
          <Button
            disabled={table.getSelectedRowModel().rows.length === 0}
            className="shadow bg-red-500 hover:bg-red-600 flex justify-center lg:justify-between gap-2 w-full"
          >
            <Trash className="flex md:hidden" />
            {'Remover'}
          </Button>
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
            {table.getRowModel().rows?.length > 0 ? (
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
                  colSpan={colunasTabelaAlunosAusente.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm mt-5 md:text-base lg:text-lg"
                >
                  Todos os alunos estão presentes!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-2 gap-2 md:w-64 md:float-right">
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
