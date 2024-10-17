import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DadosResponsaveisAluno } from '@/app/admin/api/matricula'
import { Button } from '@/components/ui/button'
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

import { ColunasTabelaResponsaveis } from './colunas-tabela-responsavel'

interface TabelaResponsavelAlunoProps {
  listaResponsaveis: DadosResponsaveisAluno[]
  carregandoLista: boolean
}

export function TabelaReponsaveisAluno({
  listaResponsaveis,
  carregandoLista,
}: TabelaResponsavelAlunoProps) {
  const tabelaResponsavel = useReactTable({
    data: listaResponsaveis,
    columns: ColunasTabelaResponsaveis,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-2">
      <div className="grid">
        <Input
          placeholder="Filtrar pelo nome..."
          className="w-full md:w-64"
          disabled={listaResponsaveis?.length === 0}
          value={
            (tabelaResponsavel.getColumn('nome')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            tabelaResponsavel
              .getColumn('nome')
              ?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border shadow overflow-auto">
        <Table>
          <TableHeader>
            {tabelaResponsavel.getHeaderGroups().map((headerGroup) => (
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
            {carregandoLista ? (
              <>
                <TableRow>
                  <TableCell colSpan={ColunasTabelaResponsaveis.length}>
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={ColunasTabelaResponsaveis.length}>
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={ColunasTabelaResponsaveis.length}>
                    <Skeleton className="h-4 w-full rounded" />
                  </TableCell>
                </TableRow>
              </>
            ) : tabelaResponsavel.getRowModel().rows?.length > 0 ? (
              tabelaResponsavel.getRowModel().rows.map((row) => (
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
                  colSpan={ColunasTabelaResponsaveis.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhuma pessoa vinculada a esse aluno
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <Button
          className="enabled:shadow-md w-full md:w-auto"
          variant="outline"
          size="sm"
          onClick={() => tabelaResponsavel.previousPage()}
          disabled={!tabelaResponsavel.getCanPreviousPage()}
        >
          Voltar
        </Button>
        <Button
          className="enabled:shadow-md w-full md:w-auto"
          variant="outline"
          size="sm"
          onClick={() => tabelaResponsavel.nextPage()}
          disabled={!tabelaResponsavel.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
