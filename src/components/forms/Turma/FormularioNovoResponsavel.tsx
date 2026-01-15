import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
    cadastrarResponsavel,
    consultaExistenciaResponsavel,
    ResponseDadosAluno,
} from '@/api/matricula'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    formatarDocumento,
    limparFormatacaoDocumento,
    validarCPF,
} from '@/lib/utils'

export interface DadosNovoResponsavelProps {
  idAluno: string
}

const schemaFormularioResponsavel = z.object({
  idAluno: z.string().uuid(),
  nome: z.string({
    required_error: 'O nome completo é obrigatório',
  }),
  cpf: z
    .string({
      required_error: 'O CPF é obrigatório',
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
})

export type FormNovoResponsavelType = z.infer<
  typeof schemaFormularioResponsavel
>

export function FormularioNovoReponsavel({
  idAluno,
}: DadosNovoResponsavelProps) {
  const queryClient = useQueryClient()
  const formDadosResponsavel = useForm<FormNovoResponsavelType>({
    resolver: zodResolver(schemaFormularioResponsavel),
    defaultValues: {
      idAluno,
      nome: '',
      cpf: '',
    },
    mode: 'onChange',
  })

  const consultaResponsavel = async (documentoResponsavel: string) => {
    const consultaDocumento = await queryClient.fetchQuery({
      queryKey: ['consultaResponsavel', documentoResponsavel],
      queryFn: () => consultaExistenciaResponsavel(documentoResponsavel),
    })

    if (consultaDocumento.data.status) {
      formDadosResponsavel.setValue(
        'nome',
        consultaDocumento.data?.dados?.nome ?? '',
      )
    }
  }

  const { mutateAsync: salvarDadosNovoResponsavel } = useMutation({
    mutationFn: cadastrarResponsavel,
    onError: (errr) => {
      toast.error('Houve um problema ao salvar dados do responsável', {
        description: errr.message,
      })
    },
    onSuccess: (data) => {
      if (data.status) {
        const dadosMatriculaAluno: ResponseDadosAluno | undefined =
          queryClient.getQueryData(['matriculaAluno', idAluno])

        queryClient.setQueryData(['matriculaAluno', idAluno], {
          ...dadosMatriculaAluno,
          dados: {
            ...dadosMatriculaAluno?.dados,
            ResponsavelAluno: [
              ...(dadosMatriculaAluno?.dados?.ResponsavelAluno ?? []),
              {
                responsavel: {
                  id: data.dados?.responsavel.id,
                  nome: data.dados?.responsavel.nome,
                  cpf: data.dados?.responsavel.cpf,
                  TelefoneResponsavel:
                    data.dados?.responsavel.TelefoneResponsavel,
                },
              },
            ],
          },
        })

        formDadosResponsavel.reset()

        toast.success('Novo responsável adicionado com sucesso!', {
          description: data.msg,
        })
      } else {
        toast.error(data.msg, {
          description: data.error,
        })
      }
    },
  })

  const handleSubmitAddResponsible = async (data: FormNovoResponsavelType) => {
    await salvarDadosNovoResponsavel(data)
  }

  useEffect(() => {
    const documentoResponsavel = limparFormatacaoDocumento(
      formDadosResponsavel.watch('cpf'),
    )

    if (documentoResponsavel.length === 11) {
      consultaResponsavel(documentoResponsavel)
    }
  }, [formDadosResponsavel.watch('cpf')])

  return (
    <Form {...formDadosResponsavel}>
      <form
        className="space-y-8"
        onSubmit={formDadosResponsavel.handleSubmit(handleSubmitAddResponsible)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormField
            control={formDadosResponsavel.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="000.000.000-00"
                    onChange={(event) => {
                      formDadosResponsavel.setValue(
                        'cpf',
                        formatarDocumento(event.target.value),
                      )
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-2">
            <FormField
              control={formDadosResponsavel.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col md:flex-row items-center">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              className="shadow w-full md:w-auto"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formDadosResponsavel.formState.isSubmitting ? (
            <Button
              disabled
              className="gap-2 shadow w-full md:w-auto"
            >
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="shadow w-full md:w-auto"
            >
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
