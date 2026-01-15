'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { mudarNomeTurma, turmaType } from '@/api/turma'
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

interface FormularioEdicaoTurmaProps {
  idTurma: string
  nomeTurma: string
}
const schemaFormularioEdicaoTurma = z.object({
  id: z.string().uuid(),
  nome: z.string({
    required_error: 'O nome da turma é obrigatório',
  }),
})

export function FormularioEdicaoTurma({
  idTurma,
  nomeTurma,
}: FormularioEdicaoTurmaProps) {
  const queryClient = useQueryClient()

  const formEdicaoTurma = useForm<z.infer<typeof schemaFormularioEdicaoTurma>>({
    resolver: zodResolver(schemaFormularioEdicaoTurma),
    defaultValues: {
      id: idTurma,
      nome: '',
    },
    mode: 'onChange',
  })

  const { mutateAsync: alterarNome } = useMutation({
    mutationFn: ({ nome, id }: z.infer<typeof schemaFormularioEdicaoTurma>) =>
      mudarNomeTurma(nome, id),
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
        turmas?.map((turma) => {
          if (turma.id === data.id) {
            return {
              id: turma.id,
              nome: data.nome,
            }
          }

          return turma
        }),
      )

      formEdicaoTurma.reset()
    },
  })

  return (
    <Form {...formEdicaoTurma}>
      <form
        className="space-y-8"
        onSubmit={formEdicaoTurma.handleSubmit(
          async (dados: z.infer<typeof schemaFormularioEdicaoTurma>) => {
            await alterarNome(dados)
          },
        )}
      >
        <FormField
          control={formEdicaoTurma.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da turma</FormLabel>
              <FormControl>
                <Input placeholder={nomeTurma} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div className="flex items-center">
            {formEdicaoTurma.formState.isSubmitting ? (
              <Button
                className="gap-2 shadow"
                disabled
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </Button>
            ) : (
              <Button
                type="submit"
                className="shadow"
              >
                Salvar
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    </Form>
  )
}
