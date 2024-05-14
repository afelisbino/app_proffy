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

export const schemaFormModeloMensagens = z.object({
  assunto: z.string({
    required_error: 'Necessário informar o assunto do modelo mensagem',
  }),
  modelo: z.string({
    required_error: 'Necessário informar o modelo da mensagem',
  }),
})

const modeloMensagens = z.object({
  id: z.string().uuid(),
  assunto: z.string().trim(),
  modelo: z.string(),
})

export type ModeloMensagensType = z.infer<typeof modeloMensagens>
