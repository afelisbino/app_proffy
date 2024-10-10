import { axiosInstance } from '@/lib/AxiosClient'

import { FormDiarioTurmaType } from '../components/forms/Turma/FormularioDiarioTurma'
import { registroNotasTurmaType } from '../schemas/SchemaDiarioClasse'

export type ResponseLancamentoDiarioTurmaType = {
  status: boolean
  msg: string
}

export type ResponseListaLancamentoNotasTurmaType = {
  status: boolean
  msg: string
  dados: Array<registroNotasTurmaType> | null
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
          realizadoEm,
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
