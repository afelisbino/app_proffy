import { z } from 'zod'

export const schemaUsuario = z.object({
  id: z.string(),
  nome: z.string().trim(),
  email: z.string(),
  status: z.boolean(),
})

export type UsuarioType = z.infer<typeof schemaUsuario>

export const schemaFormularioNovoUsuario = z.object({
  nome: z
    .string({
      required_error: 'Necessário informar o nome do usuario',
    })
    .trim(),
  email: z
    .string({
      required_error: 'Necessário informar o nome do usuário',
    })
    .email({
      message: 'Email informado é inválido',
    }),
  senha: z
    .string({
      required_error: 'Necessário criar uma senha inicial do usuário',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caractéres',
    })
    .regex(/[a-zA-Z]/, { message: 'Conter pelo menos uma letra.' })
    .regex(/[0-9]/, { message: 'Conter pelo menos um número.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Conter pelo menos um caractere especial.',
    }),
})

export type FormularioNovoUsuarioType = z.infer<
  typeof schemaFormularioNovoUsuario
>

export const schemaFormularioEdicaoUsuario = z.object({
  id: z.string().uuid(),
  nome: z
    .string({
      required_error: 'Necessário informar o nome do usuario',
    })
    .trim(),
  email: z
    .string({
      required_error: 'Necessário informar o nome do usuário',
    })
    .email({
      message: 'Email informado é inválido',
    }),
})

export type FormularioEdicaoUsuarioType = z.infer<
  typeof schemaFormularioEdicaoUsuario
>
