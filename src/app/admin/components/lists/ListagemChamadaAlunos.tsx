'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useLayoutEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { realizarChamadaTurma } from '../../api/turma'
import { AlunosTurmaType } from '../../schemas/SchemaAlunosTurma'

interface ListaAlunosChamadaProps {
  listaAlunosTurma: Array<AlunosTurmaType>
  carregandoAlunos: boolean
}

export const schemaFormChamadaTurma = z.object({
  alunos: z.array(
    z.object({
      idAluno: z.string().uuid(),
      presente: z.boolean().default(false),
      nomeAluno: z.string(),
    }),
  ),
})

export type chamadaTurmaType = z.infer<typeof schemaFormChamadaTurma>

export default function ListagemChamadaAlunos({
  listaAlunosTurma,
  carregandoAlunos,
}: ListaAlunosChamadaProps) {
  const formChamadaTurma = useForm<chamadaTurmaType>({
    resolver: zodResolver(schemaFormChamadaTurma),
    defaultValues: {
      alunos: [],
    },
    mode: 'onChange',
  })

  const { fields: alunosTurma, append: adicionarAluno } = useFieldArray({
    control: formChamadaTurma.control,
    name: 'alunos',
  })

  const { mutateAsync: encerrarChamadaTurma } = useMutation({
    mutationFn: ({ alunos }: chamadaTurmaType) =>
      realizarChamadaTurma({ alunos }),
    onError: (erro) => {
      toast.error('Houve um problema ao encerrar a chamada, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: () => {
      toast.success('Chamada encerrada com sucesso!')

      formChamadaTurma.reset()
    },
  })

  const finalizarChamada = async (dadosChamada: chamadaTurmaType) => {
    await encerrarChamadaTurma(dadosChamada)
  }

  function calculaPercentualPresenca(qtdAlunosPresente: number) {
    const qtdAlunosTurma = alunosTurma.length

    return (qtdAlunosPresente / qtdAlunosTurma) * 100
  }

  const percentualPresencaTurma = calculaPercentualPresenca(
    formChamadaTurma
      .getValues('alunos')
      .filter((chamadaTurma) => chamadaTurma.presente === true).length,
  )

  useLayoutEffect(() => {
    if (listaAlunosTurma && listaAlunosTurma.length > 0) {
      listaAlunosTurma?.forEach((aluno) => {
        adicionarAluno({
          idAluno: aluno.id,
          nomeAluno: aluno.nome,
          presente: false,
        })
      })
    } else {
      formChamadaTurma.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listaAlunosTurma])

  return carregandoAlunos ? (
    <div className="grid space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-10 w-full rounded" />
        <Skeleton className="h-10 md:w-[200px] rounded" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-10 w-full rounded" />
        <Skeleton className="h-10 md:w-[200px] rounded" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-10 w-full rounded" />
        <Skeleton className="h-10 md:w-[200px] rounded" />
      </div>

      <Skeleton className="h-16 w-full rounded" />
    </div>
  ) : (
    <div className="space-y-4">
      {alunosTurma.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Progress
              className="w-full h-2 rounded-sm dark:shadow-none"
              value={percentualPresencaTurma}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Percentual de presença na turma</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Form {...formChamadaTurma}>
        <form
          className="space-y-4"
          onSubmit={formChamadaTurma.handleSubmit(finalizarChamada)}
        >
          <div className="grid grid-cols-1 gap-2 space-y-2">
            {alunosTurma.map((aluno, index) => (
              <div
                key={aluno.idAluno}
                className="flex justify-between items-center gap-2"
              >
                <FormField
                  key={aluno.id}
                  control={formChamadaTurma.control}
                  name={`alunos.${index}.nomeAluno`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="py-8 text-base line-clamp-1"
                          {...field}
                          placeholder="Nome do aluno"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formChamadaTurma.control}
                  name={`alunos.${index}.presente`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:w-[200px]">
                      <div className="pt-2">
                        <FormLabel className="md:text-base hidden md:flex">
                          Presente
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}

            {formChamadaTurma.formState.isSubmitting ? (
              <Button
                type="button"
                className="py-8 shadow w-full text-lg bg-app-red-700 hover:bg-app-red-800 text-app-white-50"
                disabled
              >
                <Loader2 className="size-5" />
                Encerrando...
              </Button>
            ) : (
              <Button
                disabled={
                  !listaAlunosTurma ||
                  listaAlunosTurma.length === 0 ||
                  alunosTurma.length === 0
                }
                className="py-8 shadow w-full text-lg bg-app-red-700 hover:bg-app-red-800 text-app-white-50"
                type="submit"
              >
                Encerrar chamada
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
