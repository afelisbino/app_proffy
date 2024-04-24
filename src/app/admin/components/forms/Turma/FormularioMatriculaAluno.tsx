'use client'

import { validarCPF } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

interface FormularioMatriculaAlunoProps {
  idTurma: string
}

const schemaFormularioMatriculaAluno = z.object({
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
      ddd: z.string({
        required_error: 'O DDD do telefone é obrigatório',
      }),
      numero: z.string({
        required_error: 'O número do telefone é obrigatório',
      }),
      whatsapp: z.boolean().default(false),
    }),
  ),
  emails: z.array(
    z.object({
      email: z
        .string({
          required_error: 'O email do responsável é obrigatório',
        })
        .email({
          message: 'O email do responsável é inválido',
        }),
    }),
  ),
})

type TelefonesResponsavelType = z.infer<
  typeof schemaFormularioMatriculaAluno
>['telefones'][number]

type EmailResponsavelType = z.infer<
  typeof schemaFormularioMatriculaAluno
>['emails'][number]

export function FormularioMatriculaAluno({
  idTurma,
}: FormularioMatriculaAlunoProps) {
  const [telefones, adicionarTelefone] = React.useState<
    Array<TelefonesResponsavelType>
  >([])
  const [emails, adicionarEmail] = React.useState<Array<EmailResponsavelType>>(
    [],
  )

  const formMatriculaAluno = useForm<
    z.infer<typeof schemaFormularioMatriculaAluno>
  >({
    resolver: zodResolver(schemaFormularioMatriculaAluno),
    defaultValues: {
      idTurma,
      nome: '',
      cpf: '',
      rg: '',
      ra: '',
      dataNascimento: new Date(),
      nomeResponsavel: '',
      cpfResponsavel: '',
      telefones,
      emails,
    },
    mode: 'onChange',
  })

  // const {
  //   fields: telefonesResponsavel,
  //   append: adicionarTelefoneResponsavel,
  //   remove: removerTelefoneResponsavel,
  // } = useFieldArray({
  //   name: 'telefones',
  //   formMatriculaAluno.control,
  // })
}
