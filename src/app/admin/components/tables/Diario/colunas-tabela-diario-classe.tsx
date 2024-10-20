import { ColumnDef } from '@tanstack/react-table'

import { registroNotasTurmaType } from '@/app/admin/schemas/SchemaDiarioClasse'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { mascararNome } from '@/lib/utils'

export const colunasTabelaDiarioClasse: ColumnDef<registroNotasTurmaType>[] = [
  {
    accessorKey: 'aluno',
    header: 'Aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="w-auto">{mascararNome(row.getValue('aluno'))}</span>
    ),
  },
  {
    accessorKey: 'disciplina',
    header: 'Disciplina',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="w-auto">{row.getValue('disciplina')}</span>
    ),
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <Tooltip>
          <TooltipTrigger>
            <span className="line-clamp-1 w-auto">
              {row.getValue('descricao')}
            </span>
          </TooltipTrigger>
          <TooltipContent>{row.getValue('descricao')}</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: 'nota',
    header: 'Nota',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <span className="w-auto">{row.getValue('nota')}</span>,
  },

  {
    accessorKey: 'periodo',
    header: 'Período',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="w-auto">{row.getValue('periodo')}</span>
    ),
  },
  {
    accessorKey: 'tipoPeriodo',
    header: 'Tipo',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="capitalize w-auto">{row.getValue('tipoPeriodo')}</span>
    ),
  },
  {
    accessorKey: 'ano',
    header: 'Ano',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <span className="w-auto">{row.getValue('ano')}</span>,
  },
]
