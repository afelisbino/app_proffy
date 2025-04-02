import { z } from 'zod'

export const schemaAlunosAusentes = z.object({
  id: z.string().uuid(),
  nome: z.string().trim(),
  idAluno: z.string().uuid(),
  dataChamada: z.coerce.date(),
  presenca: z.boolean()
})

export type AlunoAusentesType = z.infer<typeof schemaAlunosAusentes>
