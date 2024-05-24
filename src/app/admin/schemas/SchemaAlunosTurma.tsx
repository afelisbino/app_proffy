import { z } from 'zod'

import { validarCPF } from '@/lib/utils'

export const schemaAlunosTurma = z.object({
  id: z.string().uuid(),
  idTurma: z.string().uuid(),
  nome: z.string().trim(),
  cpf: z
    .string({
      required_error: 'O CPF do aluno é obrigatório',
    })
    .min(11, {
      message: 'O CPF deve conter no mínimo 11 dígitos',
    })
    .max(14, {
      message: 'O CPF deve conter no máximo 14 dígitos',
    })
    .refine(validarCPF, {
      message: 'O CPF informado é inválido',
    }),
  rg: z.string({
    required_error: 'O RG do aluno é obrigatório',
  }),
  ra: z.string({
    required_error: 'O RA do aluno é obrigatório',
  }),
  dataNascimento: z.date({
    required_error: 'A data de nascimento do aluno é obrigatória',
  }),
})

export type AlunosTurmaType = z.infer<typeof schemaAlunosTurma>

export const schemaTurmasEscola = z.object({
  id: z.string().uuid(),
  nome: z.string().trim(),
})

export type TurmaType = z.infer<typeof schemaTurmasEscola>

export const schemaFormularioMatriculaAluno = z.object({
  idTurma: z.string().uuid(),
  nome: z.string({
    required_error: 'O nome do aluno é obrigatório',
  }),
  cpf: z
    .string({
      required_error: 'O CPF do aluno é obrigatório',
    })
    .min(11, {
      message: 'O CPF deve conter no mínimo 11 dígitos',
    })
    .max(14, {
      message: 'O CPF deve conter no máximo 14 dígitos',
    })
    .refine(validarCPF, {
      message: 'O CPF informado é inválido',
    }),
  rg: z.string({
    required_error: 'O RG do aluno é obrigatório',
  }),
  ra: z.string({
    required_error: 'O RA do aluno é obrigatório',
  }),
  dataNascimento: z.date({
    required_error: 'A data de nascimento do aluno é obrigatória',
  }),
  nomeResponsavel: z.string({
    required_error: 'O nome do responsável é obrigatório',
  }),
  cpfResponsavel: z
    .string({
      required_error: 'O CPF do responsável é obrigatório',
    })
    .min(11, {
      message: 'O CPF deve conter no mínimo 11 dígitos',
    })
    .max(14, {
      message: 'O CPF deve conter no máximo 14 dígitos',
    })
    .refine(validarCPF, {
      message: 'O CPF informado é inválido',
    }),
  telefones: z.array(
    z.object({
      ddd: z
        .string({
          required_error: 'O DDD do telefone é obrigatório',
        })
        .min(1, {
          message: 'DDD inválido',
        }),
      telefone: z
        .string({
          required_error: 'O número do telefone é obrigatório',
        })
        .min(9, {
          message: 'Telefone inválido',
        }),
      whatsapp: z.boolean().default(false),
    }),
    {
      required_error: 'Obrigatório informar ao menos um telefone',
    },
  ),
})

export type TelefonesResponsavelType = z.infer<
  typeof schemaFormularioMatriculaAluno
>['telefones'][number]

export const schemaFormularioEdicaoMatriculaAluno = z.object({
  idAluno: z.string().uuid(),
  nome: z.string({
    required_error: 'O nome do aluno é obrigatório',
  }),
  cpf: z
    .string({
      required_error: 'O CPF do aluno é obrigatório',
    })
    .min(11, {
      message: 'O CPF deve conter no mínimo 11 dígitos',
    })
    .max(14, {
      message: 'O CPF deve conter no máximo 14 dígitos',
    })
    .refine(validarCPF, {
      message: 'O CPF informado é inválido',
    }),
  rg: z.string({
    required_error: 'O RG do aluno é obrigatório',
  }),
  ra: z.string({
    required_error: 'O RA do aluno é obrigatório',
  }),
  dataNascimento: z.date({
    required_error: 'A data de nascimento do aluno é obrigatória',
  }),
})
