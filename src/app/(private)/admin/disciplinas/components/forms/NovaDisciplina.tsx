'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { inserirNovaDisciplina } from '@/api/escola'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { DisciplinaEscolaType } from '../../schemas/disciplina'

const schemaNovaDisciplina = z.object({
  nome: z
    .string({
      required_error: 'O nome da disciplina é obrigatório',
    })
    .min(1, {
      message: 'O nome da disciplina é obrigatório',
    }),
})

export type FormNovaDisciplinaType = z.infer<typeof schemaNovaDisciplina>

export function FormNovaDisciplina() {
  const queryClient = useQueryClient()
  const formNovaDisciplina = useForm<FormNovaDisciplinaType>({
    resolver: zodResolver(schemaNovaDisciplina),
    defaultValues: {
      nome: '',
    },
  })

  const { mutateAsync: adicionarDisciplina, isPending } = useMutation({
    mutationFn: inserirNovaDisciplina,
    onError: () => {
      toast.error('Houve um problema ao salvar a disciplina, tente novamente!')
    },
    onSuccess: (data) => {
      const listaDisciplina: Array<DisciplinaEscolaType> | undefined =
        queryClient.getQueryData(['listaDisciplinaEscola'])

      queryClient.setQueryData(
        ['listaDisciplinaEscola'],
        [...(listaDisciplina ?? []), data],
      )

      formNovaDisciplina.reset()
      toast.success('Disciplina inserido com sucesso!')
    },
  })

  async function onSubmitDisciplina(data: FormNovaDisciplinaType) {
    await adicionarDisciplina(data)
  }

  return (
    <section className="pb-4">
      <Form {...formNovaDisciplina}>
        <form
          className="space-y-4"
          onSubmit={formNovaDisciplina.handleSubmit(onSubmitDisciplina)}
        >
          <FormField
            control={formNovaDisciplina.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da disciplina</FormLabel>
                <FormControl>
                  <Input placeholder="Matemática" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-2 md:justify-end">
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formNovaDisciplina.reset()}
              className="shadow-md text-sm leading-none rounded"
            >
              Cancelar
            </Button>
            {isPending ? (
              <Button
                className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </Button>
            ) : (
              <Button
                className="shadow-md text-sm leading-none rounded bg-app-green-500 hover:bg-app-green-600"
                type="submit"
              >
                Salvar disciplina
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  )
}
