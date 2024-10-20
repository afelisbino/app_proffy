'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { adicionarModeloMensagem } from '@/app/admin/api/message'
import { schemaFormModeloMensagens } from '@/app/admin/schemas/SchemaMensagemAlunos'
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
import { Textarea } from '@/components/ui/textarea'

export function NovoModeloForm() {
  const queryClient = useQueryClient()
  const formModelo = useForm<z.infer<typeof schemaFormModeloMensagens>>({
    resolver: zodResolver(schemaFormModeloMensagens),
    defaultValues: {
      assunto: '',
      modelo: '',
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarDadosModelo } = useMutation({
    mutationFn: adicionarModeloMensagem,
    onError: () => {
      toast.error('Houve um problema ao salvar o modelo, tente novamente!')
    },
    onSuccess: (data) => {
      const listaModelos:
        | Array<{
            id: string
            assunto: string
            modelo: string
          }>
        | undefined = queryClient.getQueryData(['modelosMensagensEscola'])

      queryClient.setQueryData(
        ['modelosMensagensEscola'],
        [
          ...(listaModelos ?? []),
          {
            id: data.id,
            assunto: data.assunto,
            modelo: data.modelo,
          },
        ],
      )

      formModelo.reset()
    },
  })

  return (
    <Form {...formModelo}>
      <form
        className="space-y-4"
        onSubmit={formModelo.handleSubmit(async (data) => {
          await salvarDadosModelo(data)
        })}
      >
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={formModelo.control}
            name="assunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto</FormLabel>
                <FormControl>
                  <Input placeholder="Assunto da mensagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formModelo.control}
            name="modelo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Prezado, escrevo por meio desta..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="flex flex-col md:flex-row gap-2 md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formModelo.reset()}
              className="shadow-md text-sm leading-none rounded w-full"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formModelo.formState.isSubmitting ? (
            <Button
              className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600 w-full"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
                type="submit"
              >
                Salvar modelo
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
