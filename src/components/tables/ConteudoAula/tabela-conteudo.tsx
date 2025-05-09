'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import React from 'react'

import { ConteudosAulaTurmaType } from '@/schemas/SchemaDiarioClasse'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { cn } from '@/lib/utils'

import { colunasTabelaConteudoAula } from './colunas-tabela-conteudo-aula'
import { colunasTabelaDiarioClasse } from '../Diario/colunas-tabela-diario-classe'
import { DiarioConteudoDialog } from '@/components/dialogs/diario-conteudo-aula'
import { DisciplinaEscolaType } from '@/schemas/disciplina'

interface TabelaDiarioClasseProps {
  listaDisciplinas: Array<DisciplinaEscolaType>
  data: Array<ConteudosAulaTurmaType>
  isLoading: boolean
  idTurma: string | null
}

export function TabelaConteudoDiarioClasse({
  listaDisciplinas,
  data,
  isLoading,
  idTurma,
}: TabelaDiarioClasseProps) {
  const [open, setOpen] = React.useState(false)
  const [disciplinaSelecionada, setDisciplinaSelecionada] = React.useState('')
  console.log("🚀 ~ disciplinaSelecionada:", disciplinaSelecionada)

  const table = useReactTable({
    data,
    columns: colunasTabelaConteudoAula,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-2">
      <div className="flex-1 md:flex flex-col items-center py-4 md:flex-row-reverse md:justify-between space-y-2 md:space-y-0">
        {
          idTurma && (
            <Dialog>
              <Tooltip>
                <DialogTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-app-orange-500 hover:bg-app-orange-600 text-background shadow gap-2 w-full md:w-auto"
                      size={'default'}
                    >
                      <Plus className="size-5 hidden md:flex" />
                      <span className="flex md:hidden">Registrar conteúdo</span>
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                  Registrar novo conteudo de aula lecionado na turma
                </TooltipContent>
              </Tooltip>
              <DiarioConteudoDialog turmaId={idTurma} listaDisciplinas={listaDisciplinas} />
            </Dialog>
          )
        }
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex justify-between md:justify-start gap-2 w-full md:w-auto capitalize"
            >
              {disciplinaSelecionada !== '' ?
                disciplinaSelecionada
                : 'Filtrar disciplina...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full md:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Procurar disciplina..." />
              <CommandList>
                <CommandEmpty>Nenhuma disciplina encontrada</CommandEmpty>
                <CommandGroup>
                  {listaDisciplinas.map((disciplina) => (
                    <CommandItem
                      className="capitalize"
                      key={disciplina.id}
                      value={disciplina.nome}
                      onSelect={(currentValue) => {
                        setDisciplinaSelecionada(
                          currentValue === disciplinaSelecionada
                            ? ''
                            : currentValue,
                        )
                        table
                          .getColumn('disciplina')
                          ?.setFilterValue(
                            currentValue
                          )
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          disciplinaSelecionada === disciplina.nome.toLowerCase()
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {disciplina.nome}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-md border shadow overflow-auto">
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
                  colSpan={colunasTabelaConteudoAula.length}
                  className="h-16 text-center text-padrao-gray-200 text-sm font-medium mt-5 md:text-base lg:text-lg"
                >
                  Nenhum registro encontrado!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row md:justify-end gap-2">
        <Button
          className="enabled:shadow-md w-full md:w-auto"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Voltar
        </Button>
        <Button
          className="enabled:shadow-md w-full md:w-auto"
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
