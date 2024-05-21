'use client'

import { useQuery } from '@tanstack/react-query'

import { buscarUsuariosEscola } from '../../api/escola'
import { recuperarConfiguracoesExistentes } from '../whatsapp/api/ConfigWhatsapp'

import { DataTableUsuarios } from './components/tabela/lista-usuarios/tabela-usuarios'

export default function PageUsuariosEscola() {
  const { data: listaUsuariosEscola, isLoading } = useQuery({
    queryKey: ['usuariosEscola'],
    queryFn: buscarUsuariosEscola,
  })
  useQuery({
    queryKey: ['configuracaoWhatsapp'],
    queryFn: recuperarConfiguracoesExistentes,
  })

  return (
    <DataTableUsuarios data={listaUsuariosEscola ?? []} isLoading={isLoading} />
  )
}
