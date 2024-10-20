import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Save, Trash } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  adicionarNovosContatosResponsavel,
  ResponseDadosAluno,
} from '@/app/admin/api/matricula'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export interface DadosNovosContatosResponsavelProps {
  idResponsavel: string
  idAluno: string
}

const schemaFormularioAdicionarTelefone = z.object({
  idResponsavel: z.string().uuid(),
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

export type FormAdicionaContatoResponsavelContatoType = z.infer<
  typeof schemaFormularioAdicionarTelefone
>

export function FormularioNovosContatosReponsavel({
  idResponsavel,
  idAluno,
}: DadosNovosContatosResponsavelProps) {
  const queryClient = useQueryClient()
  const formDadosContatosResponsavel =
    useForm<FormAdicionaContatoResponsavelContatoType>({
      resolver: zodResolver(schemaFormularioAdicionarTelefone),
      defaultValues: {
        idResponsavel,
        telefones: [
          {
            ddd: '',
            telefone: '',
            whatsapp: false,
          },
        ],
      },
      mode: 'onChange',
    })

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: formDadosContatosResponsavel.control,
    name: 'telefones',
  })

  const { mutateAsync: salvarNovosContatos } = useMutation({
    mutationFn: adicionarNovosContatosResponsavel,
    onError: (errr) => {
      toast.error('Houve um problema ao salvar contatos do responsável', {
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
                if (responsavel.responsavel.id === idResponsavel) {
                  return {
                    responsavel: {
                      id: responsavel.responsavel.id,
                      nome: responsavel.responsavel.nome,
                      cpf: responsavel.responsavel.cpf,
                      TelefoneResponsavel: data.dados,
                    },
                  }
                }
                return responsavel
              },
            ),
          },
        })

        formDadosContatosResponsavel.reset()

        toast.success('Contatos do responsável atualizado com sucesso!', {
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
    data: FormAdicionaContatoResponsavelContatoType,
  ) => {
    await salvarNovosContatos(data)
  }

  return (
    <Form {...formDadosContatosResponsavel}>
      <form
        className="space-y-8"
        onSubmit={formDadosContatosResponsavel.handleSubmit(
          handleSubmitUpdateResponsible,
        )}
      >
        <div className="grid">
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={() =>
                appendPhone({ ddd: '', telefone: '', whatsapp: false })
              }
            >
              Novo Telefone
            </Button>
            {phoneFields.map((telefone, index) => (
              <div key={index} className="grid gap-2 p-4 border rounded">
                <div className="flex flex-row items-center justify-between md:justify-start gap-2">
                  <Button
                    className="shadow"
                    variant={'destructive'}
                    type="button"
                    onClick={() => removePhone(index)}
                  >
                    <Trash />
                  </Button>
                  <div className="flex gap-2">
                    <FormField
                      key={telefone.id}
                      control={formDadosContatosResponsavel.control}
                      name={`telefones.${index}.ddd`}
                      render={({ field }) => (
                        <FormItem className="w-full md:w-36">
                          <FormControl>
                            <Input {...field} placeholder="DDD" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      key={index}
                      control={formDadosContatosResponsavel.control}
                      name={`telefones.${index}.telefone`}
                      render={({ field }) => (
                        <FormItem className="w-auto md:w-full">
                          <FormControl>
                            <Input {...field} placeholder="N° Telefone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={formDadosContatosResponsavel.control}
                  name={`telefones.${index}.whatsapp`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between md:justify-normal rounded-lg gap-4 w-full">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Notificações
                        </FormLabel>
                        <FormDescription>
                          Ao marcar, este contato receberá notificações da
                          escola referente ao aluno
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="flex flex-col md:flex-row items-center gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-app-red-500 hover:bg-app-red-600 gap-2 shadow md:w-auto w-full"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formDadosContatosResponsavel.formState.isSubmitting ? (
            <Button
              disabled
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow md:w-auto w-full"
            >
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow md:w-auto w-full"
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
