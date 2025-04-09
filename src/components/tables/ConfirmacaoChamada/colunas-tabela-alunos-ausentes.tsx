import { ColumnDef } from '@tanstack/react-table'

import { AlunoAusentesType } from '../../../schemas/SchemaAlunosAusentes'
import { mascararNome } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
      <div className="w-auto capitalize">{row.original.presenca ? 'sim' : 'não'}</div>
    ),
  },
]
