import { axiosInstance } from '@/services/AxiosClient'

import { UsuarioType } from '../schemas/SchemaUsuariosEscola'

export interface AlterarStatusUsuarioProps {
  id: string
  status: boolean
}

interface NovoUsuarioProps {
  nome: string
  email: string
  senha: string
}

export async function buscarUsuariosEscola() {
  const response = await axiosInstance.get<Array<UsuarioType>>('escola/usuario')

  return response.data
}

export async function alterarStatusUsuario({
  id,
  status,
}: AlterarStatusUsuarioProps) {
  const response = await axiosInstance.patch<UsuarioType>(
    `escola/usuario/${id}`,
    {
      status,
    },
  )

  return response.data
}

export async function inserirNovoUsuario({
  nome,
  email,
  senha,
}: NovoUsuarioProps) {
  const response = await axiosInstance.post<UsuarioType>('escola/usuario', {
    nome,
    email,
    senha,
  })

  return response.data
}
