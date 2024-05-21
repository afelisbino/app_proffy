'use client'

import { useQuery } from '@tanstack/react-query'

import { buscarModelosMensagens } from '../../api/message'

import { DataTableModeloMensagens } from './components/tables/tabela-modelos'

export default function PageModeloMensagens() {
  const { data: listaModelosMensagensEscola, isLoading } = useQuery({
    queryKey: ['modelosMensagensEscola'],
    queryFn: () => buscarModelosMensagens(),
  })

  return (
    <DataTableModeloMensagens
      data={listaModelosMensagensEscola ?? []}
      isLoading={isLoading}
    />
  )
}
