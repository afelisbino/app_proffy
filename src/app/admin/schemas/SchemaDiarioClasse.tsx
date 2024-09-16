export type registroNotasTurma = {
  id: string
  nota: number
  periodo: string
  ano: string
  tipoPeriodo: 'mensal' | 'bimestral' | 'trimestral' | 'semestral'
  aluno: string
  disciplina: string
}
