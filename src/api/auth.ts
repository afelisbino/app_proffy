import { axiosInstance } from '@/lib/AxiosClient'
import { FormularioEdicaoUsuarioType } from '@/schemas/SchemaUsuariosEscola'

export type UsuarioType = {
  id: string
  nome: string
  email: string
  perfil: 'ADMIN' | 'PROFESSOR'
}

export async function autenticarUsuario({
  email,
  senha,
}: { email: string, senha: string }) {
  return await axiosInstance.post<{
    message: string
    status: boolean
  }>('auth/login', {
    email,
    senha,
  }).then((response) => {
    const { status } = response.data

    if (status) {
      return response.data
    }
  }).catch((error) => {
    const { response } = error

    if (response.status === 401) {
      return {
        status: false,
        message: 'Credenciais incorreta'
      }
    }
  })
}

export async function buscarDadosUsuario() {
  const response = await axiosInstance.get<UsuarioType>('auth/usuario')

  return response.data
}

export async function alterarSenhaUsuario({id, novaSenha}: FormularioEdicaoUsuarioType){
  return await axiosInstance.put<{
    status: boolean,
    msg: string
  }>(`escola/usuario/${id}/senha`, {
    novaSenha,
  }).then((response) => {
    return response.data

  }).catch((error) => {
    const { response } = error

    if (response.status === 401) {
      return {
        status: false,
        msg: 'Usuário não autorizado'
      }
    }

    return {
      status: false,
      msg: 'Falha ao alterar a senha do usuário'
    }
  })
}