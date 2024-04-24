import { z } from 'zod'

export const schemaAlunosTurma = z.object({
  id: z.string().uuid(),
  nome: z.string().trim(),
})

export type AlunosTurmaType = z.infer<typeof schemaAlunosTurma>

export const schemaTurmasEscola = z.object({
  id: z.string().uuid(),
  nome: z.string().trim(),
})

export type TurmaType = z.infer<typeof schemaTurmasEscola>
