import { z } from 'zod'

export const schemaAlunosAusentes = z.object({
  id: z.string().uuid(),
  nome: z.string().trim(),
})

export type AlunoAusentesType = z.infer<typeof schemaAlunosAusentes>
