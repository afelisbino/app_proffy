import { z } from 'zod'

const schemaMensagensAluno = z.object({
  id: z.string().uuid(),
  assunto: z.string().trim(),
  dataEnvio: z.date(),
  mensagem: z.string(),
})

export type MensagemAlunoType = z.infer<typeof schemaMensagensAluno>

const schemaAssuntosTemplateMensagem = z.object({
  id: z.string().uuid(),
  assunto: z.string(),
  template: z.string(),
})

export type TemplateMensagemType = z.infer<
  typeof schemaAssuntosTemplateMensagem
>
