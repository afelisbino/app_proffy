'use client'

import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'

import { UsuarioType } from '@/schemas/SchemaUsuariosEscola'
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
import {
    colunasTabelaUsuario,
    optionsStatusUsuario,
} from './colunas-tabela-usuarios'
import { DataTableFacetedFilter } from './filtro-status-usuario'
import { DialogNovoUsuario } from '@/components/dialogs/NovoUsuarioDialog'

interface DataTableUsuarioProps {
  data: Array<UsuarioType>
  isLoading: boolean
}

export function DataTableUsuarios({ data, isLoading }: DataTableUsuarioProps) {
  const table = useReactTable({
    data,
    columns: colunasTabelaUsuario,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-row items-center gap-2 py-4 md:flex-row-reverse justify-between">
        <Tooltip>
          <Dialog>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  size={'icon'}
                  className="bg-app-orange-500 hover:bg-app-orange-600 shadow text-background gap-2 p-2"
                >
                  <Plus className="size-5" />
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <DialogNovoUsuario />
          </Dialog>
          <TooltipContent side="bottom" sideOffset={5}>
            Novo usuário
          </TooltipContent>
        </Tooltip>
        <Input
          placeholder="Filtrar pelo nome do usuario..."
          className="w-full"
          disabled={data?.length === 0}
          value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nome')?.setFilterValue(event.target.value)
          }
        />
        <DataTableFacetedFilter
          options={optionsStatusUsuario}
          column={table.getColumn('status')}
          title="Status"
        />
      </div>
      <div className="rounded-md border shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                  <TableCell colSpan={colunasTabelaUsuario.length}>
                    <Skeleton className="h-[20px] rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={colunasTabelaUsuario.length}>
                    <Skeleton className="h-[20px] rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={colunasTabelaUsuario.length}>
                    <Skeleton className="h-[20px] rounded" />
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
                  colSpan={colunasTabelaUsuario.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhum usuário encontrado!
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
