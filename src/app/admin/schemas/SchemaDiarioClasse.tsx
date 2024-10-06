export type registroNotasTurmaType = {
  id: string
  nota: number
  periodo: string
  ano: string
  tipoPeriodo: 'mensal' | 'bimestral' | 'trimestral' | 'semestral'
  aluno: string
  disciplina: string
  lancamento: Date
  descricao: string
}
