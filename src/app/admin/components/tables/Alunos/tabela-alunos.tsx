import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { colunasTabelaAlunosTurma } from './coluna-tabela-alunos'
import React from 'react'
import { AlunosTurmaType } from '@/app/admin/schemas/SchemaAlunosTurma'
import { colunasTabelaNotificacaoAlunosTurma } from '../NotificacoesTurmas/colunas-tabela-alunos-turma'
import { Button } from '@/components/ui/button'
import { ArrowRightLeft, Plus } from 'lucide-react'

interface TabelaAlunosProps {
  data: Array<AlunosTurmaType>
}

export function TabelaAlunos({ data }: TabelaAlunosProps) {
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns: colunasTabelaAlunosTurma,
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
      <div className="flex flex-col md:flex-row gap-2 md:justify-between">
        <Input
          placeholder="Filtrar pelo nome do aluno..."
          className="w-full md:w-64"
          disabled={data?.length === 0}
          value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nome')?.setFilterValue(event.target.value)
          }
        />

        <div className="flex flex-col md:flex-row gap-2">
          <Button className="bg-app-orange-500 hover:bg-app-orange-600 w-full shadow text-background gap-2">
            <Plus />
            Nova matrícula
          </Button>
          <Button
            className="bg-app-red-500 hover:bg-app-red-600 shadow text-background gap-2 w-full"
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            <ArrowRightLeft />
            Transferir alunos
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
