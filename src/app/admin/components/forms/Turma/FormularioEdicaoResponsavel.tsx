import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  atualizarResponsavel,
  ResponseDadosAluno,
} from '@/app/admin/api/matricula'
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
import { formatarDocumento, validarCPF } from '@/lib/utils'

export interface DadosEdicaoResponsavelProps {
  idAluno: string
  id: string
  nome: string
  cpf: string
}

const schemaFormularioEdicaoResponsavel = z.object({
  id: z.string().uuid(),
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

export type FormEdicaoResponsavelType = z.infer<
  typeof schemaFormularioEdicaoResponsavel
>

export function FormularioEdicaoReponsavel({
  idAluno,
  id,
  nome,
  cpf,
}: DadosEdicaoResponsavelProps) {
  const queryClient = useQueryClient()
  const formDadosResponsavel = useForm<FormEdicaoResponsavelType>({
    resolver: zodResolver(schemaFormularioEdicaoResponsavel),
    defaultValues: {
      id,
      nome,
      cpf,
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarDadosResponsavel } = useMutation({
    mutationFn: atualizarResponsavel,
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
            ResponsavelAluno: dadosMatriculaAluno?.dados?.ResponsavelAluno.map(
              (responsavel) => {
                if (responsavel.responsavel.id === id) {
                  return {
                    responsavel: {
                      id: responsavel.responsavel.id,
                      nome: responsavel.responsavel.nome,
                      cpf: responsavel.responsavel.cpf,
                      TelefoneResponsavel:
                        responsavel.responsavel.TelefoneResponsavel,
                    },
                  }
                }
                return responsavel
              },
            ),
          },
        })

        toast.success('Novo responsável atualizado com sucesso!', {
          description: data.msg,
        })
      } else {
        toast.error(data.msg, {
          description: data.error,
        })
      }
    },
  })

  const handleSubmitUpdateResponsible = async (
    data: FormEdicaoResponsavelType,
  ) => {
    await salvarDadosResponsavel(data)
  }

  return (
    <Form {...formDadosResponsavel}>
      <form
        className="space-y-8"
        onSubmit={formDadosResponsavel.handleSubmit(
          handleSubmitUpdateResponsible,
        )}
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
                    disabled
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
        <DialogFooter className="flex items-center space-x-2">
          <DialogClose>
            <Button
              type="button"
              className="bg-app-red-500 hover:bg-app-red-600 gap-2 shadow"
            >
              <ChevronLeft className="size-5" />
              Voltar
            </Button>
          </DialogClose>
          {formDadosResponsavel.formState.isSubmitting ? (
            <Button
              disabled
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
            >
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
            >
              <Save />
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
