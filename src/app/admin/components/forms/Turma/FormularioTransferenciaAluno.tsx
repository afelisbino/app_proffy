'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRightLeft, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  transferirAlunosTurma,
  transferirAlunoTurma,
  turmaType,
} from '@/app/admin/api/turma'
import { AlunosTurmaType } from '@/app/admin/schemas/SchemaAlunosTurma'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FormularioTransferenciaAlunoProps {
  turmaAntiga: string
  idAluno?: string
  idsAlunos?: Array<{
    id: string
  }>
}

const schemaTransferenciaAluno = z.object({
  idTurma: z
    .string({
      required_error: 'Obrigatório selecionar a turma que deseja transferir',
    })
    .uuid(),
})

export function FormularioTransferenciaAluno({
  turmaAntiga,
  idAluno,
  idsAlunos,
}: FormularioTransferenciaAlunoProps) {
  const queryClient = useQueryClient()
  const formTransferenciaAluno = useForm<
    z.infer<typeof schemaTransferenciaAluno>
  >({
    resolver: zodResolver(schemaTransferenciaAluno),
  })

  const listaTurmasEscola: turmaType[] | undefined = queryClient.getQueryData([
    'turmasEscola',
  ])

  const { mutateAsync: realizarTransferenciaAluno } = useMutation({
    mutationFn: ({ idTurma }: z.infer<typeof schemaTransferenciaAluno>) =>
      transferirAlunoTurma(idAluno ?? '', idTurma),
    onError: (erro) => {
      toast.error(
        'Houve um problema ao realizar a transferência, tente novamente!',
        {
          description: erro.message,
        },
      )
    },
    onSuccess: (data) => {
      const listaAlunosTurma: AlunosTurmaType[] | undefined =
        queryClient.getQueryData(['listaAlunosTurma', turmaAntiga])

      queryClient.setQueryData(
        ['listaAlunosTurma', turmaAntiga],
        listaAlunosTurma?.filter((aluno) => aluno.id !== data.id),
      )

      toast.success('Aluno transferido com sucesso!')
    },
  })

  const { mutateAsync: realizarTransferenciasAlunos } = useMutation({
    mutationFn: ({ idTurma }: z.infer<typeof schemaTransferenciaAluno>) =>
      transferirAlunosTurma(idsAlunos ?? [], idTurma),
    onError: (erro) => {
      toast.error(
        'Houve um problema ao realizar a transferência, tente novamente!',
        {
          description: erro.message,
        },
      )
    },
    onSuccess: () => {
      const listaAlunosTurma: AlunosTurmaType[] | undefined =
        queryClient.getQueryData(['listaAlunosTurma', turmaAntiga])

      let alunosTurma: AlunosTurmaType[] = []

      idsAlunos?.forEach((alunoSelecionado) => {
        alunosTurma = listaAlunosTurma
          ? listaAlunosTurma?.filter(
              (aluno) => aluno.id !== alunoSelecionado.id,
            )
          : []
      })

      queryClient.setQueryData(['listaAlunosTurma', turmaAntiga], alunosTurma)

      toast.success('Alunos transferidos com sucesso!')
    },
  })

  async function onSubmit(data: z.infer<typeof schemaTransferenciaAluno>) {
    if (idAluno) {
      await realizarTransferenciaAluno(data)
    } else if (idsAlunos && idsAlunos.length > 0) {
      await realizarTransferenciasAlunos(data)
    }
  }

  return (
    <Form {...formTransferenciaAluno}>
      <form
        onSubmit={formTransferenciaAluno.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={formTransferenciaAluno.control}
          name="idTurma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turmas</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma turma" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listaTurmasEscola?.map((turma) => {
                    if (turma.id !== turmaAntiga) {
                      return (
                        <SelectItem key={turma.id} value={turma.id}>
                          {turma.nome}
                        </SelectItem>
                      )
                    }

                    return <></>
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                Turmas da escola disponivel para receber a transferência
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="flex flex-col md:flex-row items-center gap-2">
          <DialogClose asChild>
            <Button
              variant={'destructive'}
              type="button"
              className="shadow w-full md:w-auto"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formTransferenciaAluno.formState.isSubmitting ? (
            <Button
              className="shadow bg-app-green-500 hover:bg-app-green-600 gap-2 w-full md:w-auto"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Transferindo...
            </Button>
          ) : (
            <Button
              className="bg-app-green-500 hover:bg-app-green-600 shadow gap-2 w-full md:w-auto"
              type="submit"
            >
              <ArrowRightLeft className="size-5" />
              Transferir
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
