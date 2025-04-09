'use client'

import { useQuery } from '@tanstack/react-query'

import { buscarUsuariosEscola } from '@/api/escola'
import { DataTableUsuarios } from '@/components/tables/lista-usuarios/tabela-usuarios'

export default function PageUsuariosEscola() {
  const { data: listaUsuariosEscola, isLoading } = useQuery({
    queryKey: ['usuariosEscola'],
    queryFn: buscarUsuariosEscola,
  })

  return (
    <DataTableUsuarios data={listaUsuariosEscola ?? []} isLoading={isLoading} />
  )
}
