import { ColumnDef } from '@tanstack/react-table'

import { registroNotasTurma } from '@/app/admin/schemas/SchemaDiarioClasse'

export const colunasTabelaDiarioClasse: ColumnDef<registroNotasTurma>[] = [
  {
    accessorKey: 'aluno',
    header: 'Aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('aluno')}</div>,
  },
  {
    accessorKey: 'disciplina',
    header: 'Disciplina',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('disciplina')}</div>,
  },
  {
    accessorKey: 'nota',
    header: 'Nota',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('nota')}</div>,
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
    header: 'periodo',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('periodo')}</div>,
  },
  {
    accessorKey: 'tipoPeriodo',
    header: 'Tipo',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('Tipo')}</div>,
  },
]
