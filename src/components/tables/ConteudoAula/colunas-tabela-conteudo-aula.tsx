import { ColumnDef } from '@tanstack/react-table'

import { MenuTabelaConteudoAula } from './menu-tabela-conteudo-aula'
import { ConteudosAulaTurmaType } from '@/schemas/SchemaDiarioClasse'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const colunasTabelaConteudoAula: ColumnDef<ConteudosAulaTurmaType>[] = [
  {
    id: 'acoes',
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <MenuTabelaConteudoAula dadosConteudo={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'descricao',
    header: 'Resumo',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="w-auto line-clamp-3">{
        row.original.descricao
      }</span>
    ),
  },
  {
    accessorKey: 'realizadoEm',
    header: 'Realizado',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const dataConteudo = row.original.realizadoEm && new Date(row.original.realizadoEm)

      return (
        <span className="w-auto">{
          dataConteudo && format(
            new Date(dataConteudo.getFullYear(), dataConteudo.getMonth(), dataConteudo.getDate() + 1), 'PPP', {
            locale: ptBR,
          })
        }</span>
      )
    },
  },
  {
    accessorKey: 'disciplina',
    header: 'Disciplina',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <span className="w-auto line-clamp-3">{
        row.original.disciplina
      }</span>
    ),
  }
]
