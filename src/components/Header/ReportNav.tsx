'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Bug, Loader2, MessageCircleWarning } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { dispararMensagemAnexoWhatsApp } from '@/app/admin/api/message'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const MAX_FILE_SIZE = 1024 * 1024 * 10
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
const formSchema = z.object({
  mensagem: z.string({
    required_error: 'Necessário informar uma descrição do problema.',
  }),
  anexo: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, `Tamanho maximo de 10MB`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Somente formatos .jpg, .jpeg, .png and .webp são suportados!',
    ),
})

export type ReportFormData = z.infer<typeof formSchema>

export function ReportNav() {
  const queryClient = useQueryClient()
  const form = useForm<ReportFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mensagem: '',
      anexo: [],
    },
  })

  async function reportarProblema(dadosProblema: ReportFormData) {
    await queryClient.fetchQuery({
      queryKey: ['reportarProblema', dadosProblema],
      queryFn: () =>
        dispararMensagemAnexoWhatsApp({
          numeroWhatsapp: '16991131890',
          mensagem: dadosProblema.mensagem,
          anexo: dadosProblema.anexo[0],
        }),
    })

    form.reset()
    toast.success('Problema reportado com sucesso')
  }

  return (
    <DropdownMenu>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="border-0 rounded-full"
              variant="outline"
              size="icon"
              title="Reportar o problema do sistema"
            >
              <Bug className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Reportar problema</span>
            </Button>
          </DropdownMenuTrigger>
        </DialogTrigger>
        <DialogContent className="rounded">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl">Está com problema?</DialogTitle>
            <DialogDescription className="leading-normal">
              Poxa, que situação desagradável, pode nos contar com o máximo de
              detalhes possivel qual foi o passo a passo até chegar nesse
              problema? Queremos resolver isso o mais rápido possível.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(reportarProblema)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relato do problema</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informe todos os detalhes necessários"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="anexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anexo</FormLabel>
                      <FormControl>
                        <div className="grid w-full  items-center gap-1.5">
                          <Input
                            type="file"
                            accept="image/*"
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files)
                            }}
                            ref={field.ref}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant={'destructive'}
                  onClick={() => {
                    form.reset()
                    queryClient.cancelQueries({
                      queryKey: ['reportarProblema'],
                    })
                  }}
                >
                  Cancelar
                </Button>
                {form.formState.isSubmitting ? (
                  <Button
                    className="ml-auto shadow bg-app-green-500 hover:bg-app-green-600 gap-2"
                    disabled
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </Button>
                ) : (
                  <Button
                    className="ml-auto bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
                    type="submit"
                  >
                    <MessageCircleWarning />
                    Reportar
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
