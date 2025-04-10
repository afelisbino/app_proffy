import { axiosInstance } from '@/lib/AxiosClient'

import { FormDiarioTurmaType } from '../components/forms/Turma/FormularioDiarioTurma'
import { FormEdicaoDiarioTurmaType } from '../components/forms/Turma/FormularioEdicaoNotaAluno'
import { ConteudosAulaTurmaType, registroNotasTurmaType } from '../schemas/SchemaDiarioClasse'
import { FormDiarioConteudoAulaType } from '../components/forms/Turma/FormDiarioConteudoAula'

export type ResponseLancamentoDiarioTurmaType = {
  status: boolean
  msg: string
}

export type ResponseListaLancamentoNotasTurmaType = {
  status: boolean
  msg: string
  dados: Array<registroNotasTurmaType> | null
}

export type ResponseLancamentoConteudoTurmaType = {
  status: boolean
  msg: string
}

interface FiltroConsultaLancamentosProps {
  ano: string
  idTurma: string
}

export async function LancarNotasTurma({
  tipoPeriodo,
  periodo,
  ano,
  alunos,
  disciplinaId,
  realizadoEm,
  descricao,
}: FormDiarioTurmaType) {
  return await axiosInstance
    .post<ResponseLancamentoDiarioTurmaType>(
      'diario/lancamento',
      alunos.map((aluno) => {
        return {
          idAluno: aluno.alunoId,
          idDisciplina: disciplinaId,
          periodo: String(periodo),
          ano,
          tipoPeriodo,
          realizadoEm: new Date(realizadoEm.getFullYear(), realizadoEm.getMonth(), realizadoEm.getDate()),
          descricao,
          nota: aluno.nota,
        }
      }),
    )
    .then((data) => {
      return data.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao lançar as notas: ' + err,
      }
    })
}

export async function ListarLancamentoNotasTurma({
  idTurma,
  ano,
}: FiltroConsultaLancamentosProps) {
  return await axiosInstance
    .get<ResponseListaLancamentoNotasTurmaType>(
      `diario/lancamentos/${idTurma}`,
      {
        params: {
          ano,
        },
      },
    )
    .then((data) => {
      return {
        status: data.data.status,
        msg: data.data.msg,
        dados: data.data.dados,
      }
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao listar os lançamentos de notas: ' + err,
        dados: null,
      }
    })
}

export async function atualizarNotaAluno({
  tipoPeriodo,
  periodo,
  ano,
  alunoId,
  id,
  disciplinaId,
  realizadoEm,
  nomeAluno,
  nota,
  descricao,
}: FormEdicaoDiarioTurmaType) {
  return await axiosInstance
    .put<ResponseLancamentoDiarioTurmaType>(`diario/lancamento/${id}`, {
      idAluno: alunoId,
      idDisciplina: disciplinaId,
      periodo: String(periodo),
      ano,
      tipoPeriodo,
      realizadoEm,
      nota,
      descricao,
    })
    .then((resp) => {
      return resp.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: 'Ocorreu um erro ao atualizar a nota: ' + err,
      }
    })
}

export async function lancarConteudoAulaTurma({
  idDisciplina,
  idTurma,
  realizadoEm,
  descricao,
}: FormDiarioConteudoAulaType) {
  return await axiosInstance
    .post<ResponseLancamentoConteudoTurmaType>(
      'diario/conteudo',
      {
        idDisciplina,
        idTurma,
        realizadoEm: new Date(realizadoEm.getFullYear(), realizadoEm.getMonth(), realizadoEm.getDate()),
        descricao
      }
    )
    .then((data) => {
      return data.data
    })
    .catch((err) => {
      return {
        status: false,
        msg: `Ocorreu um erro ao lançar o conteudo: ${err}`,
      }
    })
}

export async function listaConteudoAulaTurma({ idTurma, periodo }: { idTurma: string, periodo: { inicio: Date, fim: Date } }) {
  return await axiosInstance
    .get<Array<ConteudosAulaTurmaType>>(
      `diario/conteudo/${idTurma}`,
      {
        params: {
          inicio: periodo.inicio,
          fim: periodo.fim
        }
      }
    )
    .then((data) => {
      return data.data
    })
}

export async function removerConteudoAula({ idConteudo }: { idConteudo: string }) {
  return await axiosInstance
    .delete<ResponseLancamentoConteudoTurmaType>(
      `diario/conteudo/${idConteudo}`,
    )
    .then((data) => {
      return data.data
    })
}

export async function removerAvaliacaoAluno({ idConteudo }: { idConteudo: string }) {
  return await axiosInstance
    .delete<ResponseLancamentoConteudoTurmaType>(
      `diario/lancamento/${idConteudo}`,
    )
    .then((data) => {
      return data.data
    })
}