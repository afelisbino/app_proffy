import { z } from 'zod'

import { axiosInstance } from '@/lib/AxiosClient'
import { limparFormatacaoDocumento } from '@/lib/utils'

import { chamadaTurmaType } from '../components/lists/ListagemChamadaAlunos'
import {
  AlunosTurmaType,
  schemaFormularioMatriculaAluno,
} from '../schemas/SchemaAlunosTurma'

export type turmaType = {
  id: string
  nome: string
}

export async function inserirNovaTurma(nome: string) {
  const response = await axiosInstance.post<turmaType>('turma', {
    nome,
  })

  return response.data
}

export async function buscarTurmas() {
  const response = await axiosInstance.get<Array<turmaType>>('turma')

  return response.data
}

export async function mudarNomeTurma(nome: string, idTurma: string) {
  const response = await axiosInstance.patch<turmaType>(`turma/${idTurma}`, {
    nome,
  })

  return response.data
}

export async function buscarAlunosTurma(idTurma: string | null) {
  if (idTurma) {
    const response = await axiosInstance.get<Array<AlunosTurmaType>>(
      `turma/${idTurma}/alunos`,
    )

    return response.data
  }

  return []
}

export async function matricularAluno(
  dadosAluno: z.infer<typeof schemaFormularioMatriculaAluno>,
) {
  const response = await axiosInstance.post<AlunosTurmaType>(
    `/turma/${dadosAluno.idTurma}/aluno/matricula`,
    {
      nome: dadosAluno.nome,
      dataNascimento: new Date(dadosAluno.dataNascimento),
      cpf: limparFormatacaoDocumento(dadosAluno.cpf),
      rg: limparFormatacaoDocumento(dadosAluno.rg),
      ra: limparFormatacaoDocumento(dadosAluno.ra),
      nomeResponsavel: dadosAluno.nomeResponsavel,
      cpfResponsavel: limparFormatacaoDocumento(dadosAluno.cpfResponsavel),
      telefones: dadosAluno.telefones,
    },
  )

  return response.data
}

export async function transferirAlunoTurma(idAluno: string, idTurma: string) {
  const response = await axiosInstance.patch<AlunosTurmaType>(
    `/turma/aluno/${idAluno}/transferir`,
    {
      idTurma,
    },
  )

  return response.data
}

export async function transferirAlunosTurma(
  idsAlunos: Array<{
    id: string
  }>,
  idTurma: string,
) {
  const response = await axiosInstance.patch<AlunosTurmaType>(
    `/turma/alunos/transferencias`,
    {
      alunos: idsAlunos,
      idTurma,
    },
  )

  return response.data
}

export async function desmatricularAluno(idAluno: string) {
  const response = await axiosInstance.delete<AlunosTurmaType>(
    `/turma/aluno/${idAluno}`,
  )

  return response.data
}

export async function realizarChamadaTurma({ alunos }: chamadaTurmaType) {
  const response = await axiosInstance.post(`/turma/chamada`, {
    chamada: alunos.map((chamadaAluno) => {
      return {
        idAluno: chamadaAluno.idAluno,
        presente: chamadaAluno.presente,
      }
    }),
  })

  return response.data
}
