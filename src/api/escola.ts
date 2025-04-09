import { axiosInstance } from '@/lib/AxiosClient'
import { UsuarioType } from '@/schemas/SchemaUsuariosEscola'
import { FormNovaDisciplinaType } from '@/components/forms/NovaDisciplina'
import { DisciplinaEscolaType, ExcluirDisciplinaProps } from '@/schemas/disciplina'

export interface AlterarStatusUsuarioProps {
  id: string
  status: boolean
}

interface NovoUsuarioProps {
  nome: string
  email: string
  senha: string
  perfil: 'ADMIN' | 'PROFESSOR'
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
  perfil
}: NovoUsuarioProps) {
  const response = await axiosInstance.post<UsuarioType>('escola/usuario', {
    nome,
    email,
    senha,
    perfil
  })

  return response.data
}

export async function inserirNovaDisciplina({ nome }: FormNovaDisciplinaType) {
  const response = await axiosInstance.post<DisciplinaEscolaType>(
    'escola/disciplina',
    {
      nome,
    },
  )

  return response.data
}

export async function excluirDisciplina({ id }: ExcluirDisciplinaProps) {
  const response = await axiosInstance.delete<DisciplinaEscolaType>(
    `escola/disciplina/${id}`,
  )

  return response.data
}

export async function buscarListaDisciplinas() {
  const response =
    await axiosInstance.get<Array<DisciplinaEscolaType>>(`escola/disciplina`)

  return response.data
}
