'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { schemaFormModeloMensagens } from '@/app/admin/schemas/SchemaMensagemAlunos'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
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
  const formModelo = useForm<z.infer<typeof schemaFormModeloMensagens>>({
    resolver: zodResolver(schemaFormModeloMensagens),
    defaultValues: {
      assunto: '',
      modelo: '',
    },
    mode: 'onChange',
  })

  async function salvarDadosModelo() {
    formModelo.reset()
  }

  return (
    <Form {...formModelo}>
      <form
        className="space-y-4"
        onSubmit={formModelo.handleSubmit(salvarDadosModelo)}
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
        <div className="flex flex-row gap-2 float-right">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formModelo.reset()}
              className="shadow-md text-sm leading-none rounded"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formModelo.formState.isSubmitting ? (
            <Button
              className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
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
        </div>
      </form>
    </Form>
  )
}
