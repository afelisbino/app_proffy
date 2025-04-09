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

import { ModeloMensagensType } from '@/schemas/SchemaMensagemAlunos'
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

import { colunasTabelaModeloMensagem } from './colunas-tabela-modelos'
import { DialogNovoModelo } from '@/components/dialogs/NovoModeloDialog'

interface DataTableModelosProps {
  data: Array<ModeloMensagensType>
  isLoading: boolean
}

export function DataTableModeloMensagens({
  data,
  isLoading,
}: DataTableModelosProps) {
  const table = useReactTable({
    data,
    columns: colunasTabelaModeloMensagem,
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
            <DialogNovoModelo />
          </Dialog>
          <TooltipContent side="bottom" sideOffset={5}>
            Novo modelo
          </TooltipContent>
        </Tooltip>
        <Input
          placeholder="Filtrar pelo assunto..."
          className="w-full"
          disabled={data?.length === 0}
          value={(table.getColumn('assunto')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('assunto')?.setFilterValue(event.target.value)
          }
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
                  <TableCell colSpan={colunasTabelaModeloMensagem.length}>
                    <Skeleton className="h-[20px] rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={colunasTabelaModeloMensagem.length}>
                    <Skeleton className="h-[20px] rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={colunasTabelaModeloMensagem.length}>
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
                  colSpan={colunasTabelaModeloMensagem.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhum modelo encontrado!
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
