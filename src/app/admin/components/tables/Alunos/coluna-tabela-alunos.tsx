import { ColumnDef } from '@tanstack/react-table'
import { AlunosTurmaType } from '../../../schemas/SchemaAlunosTurma'
import { Checkbox } from '@/components/ui/checkbox'
import { MenuTabelaAluno } from './menu-tabela-alunos'

export const colunasTabelaAlunosTurma: ColumnDef<AlunosTurmaType>[] = [
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
    header: 'Nome do aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div className="md:w-96">{row.getValue('nome')}</div>,
  },
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex flex-row justify-center md:w-4">
        <MenuTabelaAluno dadosAluno={row.original} />
      </div>
    ),
  },
]
