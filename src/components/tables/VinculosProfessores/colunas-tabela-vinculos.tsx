import { ColumnDef } from '@tanstack/react-table'

import { TurmaProfessorVinculo } from '@/schemas/turmas-professor'
import { Badge } from '@/components/ui/badge'
import { MenuTabelaVinculos } from './menu-tabela-vinculos'

export const colunasTabelaVinculos: ColumnDef<TurmaProfessorVinculo>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-2">
        <MenuTabelaVinculos row={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'nomeProfessor',
    header: 'Professor',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-auto">
        <div className="font-medium">{row.getValue('nomeProfessor')}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.emailProfessor}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'nomeTurma',
    header: 'Turma',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-medium">
        {row.getValue('nomeTurma')}
      </Badge>
    ),
  },
]
