import { ColumnDef } from '@tanstack/react-table'

import { registroNotasTurmaType } from '@/app/admin/schemas/SchemaDiarioClasse'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const colunasTabelaDiarioClasse: ColumnDef<registroNotasTurmaType>[] = [
  {
    accessorKey: 'aluno',
    header: 'Aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('aluno')}</div>,
  },
  {
    accessorKey: 'ano',
    header: 'Ano',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('ano')}</div>,
  },
  {
    accessorKey: 'periodo',
    header: 'Período',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('periodo')}</div>,
  },
  {
    accessorKey: 'tipoPeriodo',
    header: 'Tipo',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('tipoPeriodo')}</div>
    ),
  },
  {
    accessorKey: 'disciplina',
    header: 'Disciplina',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('disciplina')}</div>,
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <div className="line-clamp-1">{row.getValue('descricao')}</div>
        </TooltipTrigger>
        <TooltipContent>{row.getValue('descricao')}</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'nota',
    header: 'Nota',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('nota')}</div>,
  },
]
