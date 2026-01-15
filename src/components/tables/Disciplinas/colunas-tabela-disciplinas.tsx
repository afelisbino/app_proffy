import { ColumnDef } from '@tanstack/react-table'

import { DisciplinaEscolaType } from '@/schemas/disciplina'

import { MenuTabelaDisciplina } from './menu-tabela-disciplinas'

export const colunasTabelaDisciplinas: ColumnDef<DisciplinaEscolaType>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-2">
        <MenuTabelaDisciplina row={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'nome',
    header: 'Nome da disciplina',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-auto font-medium">{row.getValue('nome')}</div>
    ),
  },
]
