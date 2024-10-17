import { ColumnDef } from '@tanstack/react-table'

import { DadosResponsaveisAluno } from '@/app/admin/api/matricula'
import { aplicarMascaraDocumento, mascararNome } from '@/lib/utils'

import { MenuTabelaResponsavel } from './menu-tabela-responsavel'

export const ColunasTabelaResponsaveis: ColumnDef<DadosResponsaveisAluno>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <MenuTabelaResponsavel dadosResponsavel={row.original} />
      </div>
    ),
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
    header: 'Nome',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <div>{mascararNome(row.getValue('nome'))}</div>,
  },
]
