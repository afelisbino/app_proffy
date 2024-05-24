import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { aplicarMascaraDocumento } from '@/lib/utils'

import { AlunosTurmaType } from '../../../schemas/SchemaAlunosTurma'

import { MenuTabelaAluno } from './menu-tabela-alunos'

export const colunasTabelaAlunosTurma: ColumnDef<AlunosTurmaType>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex flex-row justify-center md:w-4">
        <MenuTabelaAluno dadosAluno={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'cpf',
    header: 'Documento',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="md:w-48">
        {aplicarMascaraDocumento(row.getValue('cpf'))}
      </div>
    ),
  },
  {
    accessorKey: 'nome',
    header: 'Nome do aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div className="md:w-96">{row.getValue('nome')}</div>,
  },
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
]
