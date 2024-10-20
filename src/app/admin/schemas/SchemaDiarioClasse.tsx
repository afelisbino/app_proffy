export type registroNotasTurmaType = {
  id: string
  nota: number
  periodo: string
  ano: string
  tipoPeriodo: 'mensal' | 'bimestral' | 'trimestral' | 'semestral'
  aluno: string
  alunoId: string
  disciplina: string
  disciplinaId: string
  turmaId: string
  lancamento: Date
  descricao: string
}
