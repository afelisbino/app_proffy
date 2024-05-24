'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { inserirNovaTurma, turmaType } from '@/app/admin/api/turma'
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
import { Input } from '@/components/ui/input'

const schemaFormularioCadastroTurma = z.object({
  nome: z.string({
    required_error: 'O nome da turma é obrigatório',
  }),
})

export function FormularioCadastroTurma() {
  const queryClient = useQueryClient()

  const formCadastroTurma = useForm<
    z.infer<typeof schemaFormularioCadastroTurma>
  >({
    resolver: zodResolver(schemaFormularioCadastroTurma),
    defaultValues: {
      nome: '',
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarDadosTurma } = useMutation({
    mutationFn: ({ nome }: z.infer<typeof schemaFormularioCadastroTurma>) =>
      inserirNovaTurma(nome),
    onError: (erro) => {
      toast.error('Houve um problema ao salvar a turma, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: (data) => {
      const turmas: Array<turmaType> | undefined = queryClient.getQueryData([
        'turmasEscola',
      ])

      queryClient.setQueryData(
        ['turmasEscola'],
        [
          ...(turmas ?? []),
          {
            id: data.id,
            nome: data.nome,
          },
        ],
      )

      formCadastroTurma.reset()
    },
  })

  return (
    <Form {...formCadastroTurma}>
      <form
        onSubmit={formCadastroTurma.handleSubmit(
          async (dados: z.infer<typeof schemaFormularioCadastroTurma>) => {
            await salvarDadosTurma(dados)
          },
        )}
        className="space-y-8"
      >
        <FormField
          control={formCadastroTurma.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da turma</FormLabel>
              <FormControl>
                <Input placeholder="1A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div className="flex items-center">
            {formCadastroTurma.formState.isSubmitting ? (
              <Button
                className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
              >
                <Save className="size-5" />
                Salvar
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    </Form>
  )
}
