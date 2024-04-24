import { Checkbox } from '@/components/ui/checkbox'
import { AlunoAusentesType } from '../../../schemas/SchemaAlunosAusentes'
import { ColumnDef } from '@tanstack/react-table'

export const colunasTabelaAlunosAusente: ColumnDef<AlunoAusentesType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nome',
    header: 'Aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-96 capitalize">{row.getValue('nome')}</div>
    ),
  },
]
