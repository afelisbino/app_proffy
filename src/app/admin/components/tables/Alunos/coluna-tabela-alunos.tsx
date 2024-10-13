import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { aplicarMascaraDocumento, mascararNome } from '@/lib/utils'

import { AlunosTurmaType } from '../../../schemas/SchemaAlunosTurma'

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
      <div>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'cpf',
    header: 'Documento',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div>{aplicarMascaraDocumento(row.getValue('cpf'))}</div>
    ),
  },
  {
    accessorKey: 'nome',
    header: 'Nome do aluno',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{mascararNome(row.getValue('nome'))}</div>,
  },
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <MenuTabelaAluno dadosAluno={row.original} />
      </div>
    ),
  },
]
