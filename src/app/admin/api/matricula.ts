import { axiosInstance } from '@/lib/AxiosClient'

import { RemocaoContatoResponsavelProps } from '../components/dialogs/remover-contato-responsavel'
import { RemocaoVinculoResponsavelProps } from '../components/dialogs/remover-vinculo-responsavel'
import { FormAdicionaContatoResponsavelContatoType } from '../components/forms/Turma/FormularioAdicionarNovosContatos'
import { FormEdicaoMatriculaType } from '../components/forms/Turma/FormularioEdicaoMatriculaAluno'
import { FormEdicaoResponsavelType } from '../components/forms/Turma/FormularioEdicaoResponsavel'
import { FormNovoResponsavelType } from '../components/forms/Turma/FormularioNovoResponsavel'

export type ContatoResponsavelType = {
  id: string
  ddd: string
  telefone: string
  whatsapp: boolean
}

export type DadosResponsaveisAluno = {
  idAluno?: string
  nome: string
  id: string
  cpf: string
  TelefoneResponsavel: ContatoResponsavelType[]
}

export type DadosMatriculaAluno = {
  nome: string
  id: string
  cpf: string
  rg: string
  ra: string
  dataNascimento: Date
  notificacaoBloqueado: boolean
  ResponsavelAluno: {
    responsavel: DadosResponsaveisAluno
  }[]
}

export type ResponseDadosAluno = {
  status: boolean
  msg: string
  dados: DadosMatriculaAluno | null
  error?: unknown
}

export async function consultaDadosMatricula(idAluno: string) {
  return await axiosInstance
    .get<ResponseDadosAluno>(`matricula/aluno/${idAluno}`)
    .then((response) => {
      if (response.data.status) {
        return {
          status: response.data.status,
          msg: response.data.msg,
          dados: response.data.dados,
        }
      }

      return {
        status: response.data.status,
        msg: response.data.msg,
        dados: response.data.dados,
        error: response.data.error,
      }
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao consultar os dados da matrícula: ' + err,
        dados: null,
      }
    })
}

export async function atualizarDadosMatricula({
  idAluno,
  nome,
  cpf,
  rg,
  ra,
  dataNascimento,
}: FormEdicaoMatriculaType) {
  return await axiosInstance
    .put<{
      status: boolean
      msg: string
      dados: null | {
        id: string
        nome: string
        cpf: string
        rg: string
        ra: string
        dataNascimento: Date
        notificacaoBloqueado: boolean
        idTurma: string
      }
      error?: string
    }>(`matricula/${idAluno}`, {
      nome,
      cpf,
      rg,
      ra,
      dataNascimento,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao modificar os dados da mtricula',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function modificarBloqueioNoticacoesAluno({
  status,
  idAluno,
}: {
  status: boolean
  idAluno: string
}) {
  return await axiosInstance
    .patch<{
      status: boolean
      msg: string
      dados: null | {
        id: string
        notificacaoBloqueado: boolean
      }
      error?: string
    }>(`/matricula/notificacao/aluno/${idAluno}`, {
      status,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao modificar o bloqueio das notificações',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function consultaExistenciaResponsavel(documento: string) {
  return axiosInstance.get<{
    status: boolean
    msg: string
    dados: null | DadosResponsaveisAluno
    error?: string
  }>('matricula/verifica/responsavel', {
    params: {
      doc: documento,
    },
  })
}

export async function cadastrarResponsavel({
  idAluno,
  nome,
  cpf,
}: FormNovoResponsavelType) {
  return await axiosInstance
    .post<{
      status: boolean
      msg: string
      dados: null | {
        responsavel: DadosResponsaveisAluno
      }
      error?: string
    }>(`matricula/aluno/${idAluno}/responsavel`, {
      nome,
      cpf,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao cadastrar o responsável',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function atualizarResponsavel({
  id,
  nome,
  cpf,
}: FormEdicaoResponsavelType) {
  return await axiosInstance
    .put<{
      status: boolean
      msg: string
      dados: null | {
        nome: string
        id: string
        cpf: string
      }
      error?: string
    }>(`matricula/responsavel/${id}`, {
      nome,
      cpf,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao edição o responsável',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function adicionarNovosContatosResponsavel({
  idResponsavel,
  telefones,
}: FormAdicionaContatoResponsavelContatoType) {
  return await axiosInstance
    .post<{
      status: boolean
      msg: string
      dados: null | ContatoResponsavelType[]
      error?: string
    }>(`matricula/responsavel/${idResponsavel}/contato`, {
      telefones,
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao adicionar novos contatos ao responsável',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function removerResponsavelAluno({
  idResponsavel,
  idAluno,
}: RemocaoVinculoResponsavelProps) {
  return await axiosInstance
    .delete<{
      status: boolean
      msg: string
      dados: null | {
        idResponsavel: string
        idAluno: string
      }
      error?: string
    }>(`matricula/aluno/${idAluno}/responsavel/${idResponsavel}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao remover o responsável do aluno',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function alterarPermissaoContatoResponsavel({
  idContato,
  idResponsavel,
  statusAtual,
}: {
  idContato: string
  idResponsavel: string
  statusAtual: boolean
}) {
  return await axiosInstance
    .patch<{
      status: boolean
      msg: string
      dados: null | {
        idResponsavel: string
        id: string
        ddd: string
        telefone: string
        whatsapp: boolean
      }
      error?: string
    }>(
      `matricula/responsavel/${idResponsavel}/contato/${idContato}/notificacao`,
      {
        statusBloqueio: !statusAtual,
      },
    )
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao alterar a permissão do contato',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}

export async function removerContatoResponsavel({
  idResponsavel,
  idContato,
}: RemocaoContatoResponsavelProps) {
  return await axiosInstance
    .delete<{
      status: boolean
      msg: string
      dados: null | {
        idResponsavel: string
        id: string
        ddd: string
        telefone: string
        whatsapp: boolean
      }
      error?: string
    }>(`matricula/responsavel/${idResponsavel}/contato/${idContato}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao remover o contato do responsável',
        dados: null,
        error: err.response?.data?.msg || 'Erro interno do servidor',
      }
    })
}
