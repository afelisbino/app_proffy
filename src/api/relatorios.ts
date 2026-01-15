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

// ===== RELATÓRIOS DE DESEMPENHO =====

export type TipoPeriodo = 'mensal' | 'bimestral' | 'trimestral' | 'semestral'

export interface RelatorioAluno {
  id: string
  conteudo: string
  periodo: string
  tipoPeriodo: TipoPeriodo
  criadoEm: string
  aluno: {
    id: string
    nome: string
    ra: string
    turma: {
      id: string
      nome: string
    }
  }
  professor: {
    id: string
    nome: string
    email: string
  }
}

export interface CriarRelatorioRequest {
  conteudo: string
  periodo: string
  tipoPeriodo: TipoPeriodo
  idAluno: string
  // idProfessor é obtido automaticamente do cookie session-user no backend
}

export interface AtualizarRelatorioRequest {
  id: string
  conteudo: string
  periodo: string
  tipoPeriodo: TipoPeriodo
}

export interface FiltrosRelatorios {
  idTurma?: string
  idProfessor?: string
  periodo?: string
  tipoPeriodo?: TipoPeriodo
}

export interface ListarRelatoriosResponse {
  relatorios: RelatorioAluno[]
}

export interface CadastrarRelatorioResponse {
  mensagem: string
  relatorio: {
    id: string
    conteudo: string
    periodo: string
    tipoPeriodo: string
    idAluno: string
    idProfessor: string
  }
}

export interface GerarFrequenciaPDFParams {
  idAluno: string
  dataInicio: string // YYYY-MM-DD
  dataFim: string // YYYY-MM-DD
}

export interface GerarBoletimPDFParams {
  idAluno: string
  ano: string
  tipoPeriodo: TipoPeriodo
  periodos: string[] // Array que será convertido em CSV
}

/**
 * Lista relatórios de desempenho com filtros opcionais
 */
export async function listarRelatorios(filtros?: FiltrosRelatorios) {
  const response = await axiosInstance.get<ListarRelatoriosResponse>(
    '/relatorio-aluno/listar',
    {
      params: filtros,
    }
  )
  return response.data
}

/**
 * Cria um novo relatório de desempenho
 */
export async function criarRelatorio(data: CriarRelatorioRequest) {
  const response = await axiosInstance.post<CadastrarRelatorioResponse>(
    '/relatorio-aluno/cadastrar',
    data
  )
  return response.data
}

/**
 * Atualiza um relatório existente
 */
export async function atualizarRelatorio(data: AtualizarRelatorioRequest) {
  const response = await axiosInstance.put<CadastrarRelatorioResponse>(
    '/relatorio-aluno/editar',
    data
  )
  return response.data
}

/**
 * Gera PDF de relatório de frequência
 */
export async function gerarFrequenciaPDF(
  params: GerarFrequenciaPDFParams
): Promise<Blob> {
  const response = await axiosInstance.get('/frequencia/gerar-pdf', {
    params,
    responseType: 'blob',
  })
  return response.data
}

/**
 * Gera PDF de boletim escolar com análise comparativa
 */
export async function gerarBoletimPDF(
  params: GerarBoletimPDFParams
): Promise<Blob> {
  const { periodos, ...rest } = params
  const response = await axiosInstance.get('/boletim/gerar-pdf', {
    params: {
      ...rest,
      periodos: periodos.join(','), // Converte array em CSV
    },
    responseType: 'blob',
  })
  return response.data
}

/**
 * Gera PDF do relatório de desempenho do aluno
 */
export async function gerarRelatorioPDF(id: string): Promise<Blob> {
  const response = await axiosInstance.get('/relatorio-aluno/gerar-pdf', {
    params: { id },
    responseType: 'blob',
  })
  return response.data
}
