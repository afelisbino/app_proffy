import { axiosInstance } from '@/lib/AxiosClient'
import { AlunoAusentesType } from '../schemas/SchemaAlunosAusentes'

export type EstatisticaEscola = {
  qtdTurmasEscola: number
  totalAlunos: number
  totalFaltasAnoAtual: number
  frequenciaAtual: number
  totalNotificacoesEnviadaMesAtual: number
  totalNotificacoesEnviadaMesPassado: number
}

export type EstatisticaFrequencia = {
  Aluno: string
  TotalFaltas: number
}[]

export type EstatisticasAvaliacao = {
  Aluno: string
  Descricao: string
  Disciplina: string
  Media: number
}[]

interface EstatisticaFrequenciaProps {
  inicio: Date
  fim: Date
  idTurma: string
}

interface EstatisticaAvaliacoesProps {
  inicio: Date
  fim: Date
  idTurma: string
  idDisciplina: string
  tipoPeriodo: string
  periodo: number
}

export async function buscaEstatisticasEscola() {
  const response = await axiosInstance.get<EstatisticaEscola>(
    'relatorio/estatisticas',
  )

  return response.data
}

export async function buscaEstatisticasFrequenciaAlunos({
  inicio,
  fim,
  idTurma,
}: EstatisticaFrequenciaProps) {
  const response = await axiosInstance.get<EstatisticaFrequencia>(
    'relatorio/frequencia',
    {
      params: {
        inicio,
        fim,
        turma: idTurma,
      },
    },
  )

  return response.data
}

export async function buscarRelatorioAvaliacaoAlunos({
  idTurma,
  idDisciplina,
  inicio,
  fim,
  periodo,
  tipoPeriodo,
}: EstatisticaAvaliacoesProps) {
  const response = await axiosInstance.get<EstatisticasAvaliacao>(
    'relatorio/avaliacoes',
    {
      params: {
        inicio,
        fim,
        turma: idTurma,
        disciplina: idDisciplina,
        periodo,
        tipoPeriodo,
      },
    },
  )

  return response.data
}

export async function buscaListaFrequenciaTurma({ inicio, fim, idTurma }: Pick<EstatisticaAvaliacoesProps, 'inicio' | 'fim' | 'idTurma'>) {
  const response = await axiosInstance.get<Array<AlunoAusentesType>>(
    `turma/chamada/${idTurma}`,
    {
      params: {
        inicio,
        fim
      }
    }
  )

  return response.data
}
