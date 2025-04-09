import { ColumnDef } from '@tanstack/react-table'

import { ModeloMensagensType } from '@/schemas/SchemaMensagemAlunos'

import { MenuTabelaModelo } from './menu-tabela-modelos'

export const colunasTabelaModeloMensagem: ColumnDef<ModeloMensagensType>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-2">
        <MenuTabelaModelo row={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'assunto',
    header: 'Assunto modelo',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => <div className="w-auto">{row.getValue('assunto')}</div>,
  },
  {
    accessorKey: 'modelo',
    header: 'Modelo',
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div className="w-auto line-clamp-2">{row.getValue('modelo')}</div>
    ),
  },
]
