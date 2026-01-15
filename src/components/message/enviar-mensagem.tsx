'use query'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loader2, Send } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useModelosNotificacao } from '@/lib/use-case'

import { enviarMensagemWhatsApp } from '@/api/message'
import { AlunosTurmaType } from '@/schemas/SchemaAlunosTurma'
import ListagemTemplatesAssunto from '@/components/lists/ListagemAssuntosMensagens'

export interface EnviarMensagemAlunoProps {
  alunos?: Array<AlunosTurmaType>
  aluno?: AlunosTurmaType
}

const schemaFormNotificacao = z.object({
  idAluno: z.string().uuid().optional(),
  alunos: z.array(z.object({ id: z.string().uuid() })).optional(),
  mensagem: z
    .string({
      required_error: 'Necessário informar uma mensagem para ser enviado',
    })
    .min(1, {
      message: 'Necessário informar uma mensagem para ser enviado',
    }),
})

export type envioMensagemResponsavelType = z.infer<typeof schemaFormNotificacao>

export function EnviarMensagemAluno({
  aluno,
  alunos,
}: EnviarMensagemAlunoProps) {
  const queryClient = useQueryClient()
  const [modeloSelecionado] = useModelosNotificacao()
  const listaAssuntos:
    | Array<{
        id: string
        assunto: string
        modelo: string
      }>
    | undefined = queryClient.getQueryData(['modelosNotificacoes'])

  const formNotificacaoResponsavel = useForm<envioMensagemResponsavelType>({
    resolver: zodResolver(schemaFormNotificacao),
    defaultValues: {
      idAluno: aluno?.id ?? undefined,
      alunos:
        alunos?.map((aluno) => {
          return { id: aluno.id }
        }) ?? undefined,
      mensagem: '',
    },
    mode: 'onChange',
  })

  const { mutateAsync: dispararMensagem } = useMutation({
    mutationFn: ({ idAluno, alunos, mensagem }: envioMensagemResponsavelType) =>
      enviarMensagemWhatsApp({ idAluno, alunos, mensagem }),
    onError: (erro) => {
      toast.error('Houve um problema ao disparar mensagem, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: () => {
      toast.success('Mensagem enviada com sucesso!')

      formNotificacaoResponsavel.reset()
    },
  })

  async function submitForm(dados: envioMensagemResponsavelType) {
    await dispararMensagem(dados)
  }

  useEffect(() => {
    if (modeloSelecionado.selected) {
      const assunto = listaAssuntos?.find(
        (assunto) => assunto.id === modeloSelecionado.selected,
      )

      formNotificacaoResponsavel.setValue('mensagem', assunto?.modelo ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeloSelecionado.selected])

  return (
    <div className="flex flex-col">
      <div className="flex items-start py-4">
        <div className="flex items-start">
          <ListagemTemplatesAssunto listaAssuntos={listaAssuntos ?? []} />
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          {format(new Date(), 'PPpp', { locale: ptBR })}
        </div>
      </div>
      <Separator />
      <div className="py-4">
        <Form {...formNotificacaoResponsavel}>
          <form
            className="space-y-8"
            onSubmit={formNotificacaoResponsavel.handleSubmit(submitForm)}
          >
            <div className="grid gap-4">
              <FormField
                control={formNotificacaoResponsavel.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Prezado(a) responsável..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="flex items-center">
                  {formNotificacaoResponsavel.formState.isSubmitting ? (
                    <Button
                      className=" gap-2 shadow"
                      disabled
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="sm"
                      className="ml-auto  gap-2"
                    >
                      <Send className="size-5" />
                      Enviar
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
