import { axiosInstance } from '@/lib/AxiosClient'

interface AutenticacaoUsuarioProps {
  email: string
  senha: string
}

export type UsuarioType = {
  nome: string
  email: string
}

export async function autenticarUsuario({
  email,
  senha,
}: AutenticacaoUsuarioProps) {
  const response = await axiosInstance.post<{
    message: string
    status: boolean
  }>('auth/login', {
    email,
    senha,
  })

  return response.data
}

export async function buscarDadosUsuario() {
  const response = await axiosInstance.get<UsuarioType>('auth/usuario')

  return response.data
}
