import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { realizarChamadaTurma } from '@/app/admin/api/turma'
import { AlunosTurmaType } from '@/app/admin/schemas/SchemaAlunosTurma'
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
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { mascararNome } from '@/lib/utils'

interface ListaAlunosChamadaProps {
  dataChamada: Date
  listaAlunosTurma: Array<AlunosTurmaType>
  carregandoAlunos: boolean
}

export const schemaFormChamadaTurma = z.object({
  alunos: z.array(
    z.object({
      idAluno: z.string().uuid(),
      presente: z.boolean().default(false),
      nomeAluno: z.string(),
      dataChamada: z.coerce.date()
    }),
  ),
})

export type chamadaTurmaType = z.infer<typeof schemaFormChamadaTurma>

export function FormChamadaAlunos({
  listaAlunosTurma,
  carregandoAlunos,
  dataChamada
}: ListaAlunosChamadaProps) {
  const [todosPresenteSelecionado, selecionarTodosPresente] = useState(false)
  const formChamadaTurma = useForm<chamadaTurmaType>({
    resolver: zodResolver(schemaFormChamadaTurma),
    defaultValues: {
      alunos:
        listaAlunosTurma.length > 0
          ? listaAlunosTurma.map((aluno) => {
              return {
                idAluno: aluno.id,
                presente: false,
                nomeAluno: mascararNome(aluno.nome),
                dataChamada,
              }
            })
          : [],
    },
    mode: 'onChange',
  })

  const { fields: alunosTurma } = useFieldArray({
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

  const handleSelecionarTodosPresente = () => {
    const alunosAusentes = formChamadaTurma
      .getValues('alunos')
      .filter((aluno) => aluno.presente === false)

    if (alunosAusentes.length === 0) {
      selecionarTodosPresente(true)
    } else {
      selecionarTodosPresente(false)
    }
  }

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
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row gap-2 items-center">
                <Progress
                  className="w-full h-2 rounded-sm dark:shadow-none"
                  value={percentualPresencaTurma}
                />
                <span className="text-lg">{`${percentualPresencaTurma}%`}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Percentual de presença na turma</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Todos presentes</Label>
              <p className="text-muted-foreground">
                Ao selecionar, todos os alunos da turma será marcado como
                presentes
              </p>
            </div>
            <div>
              <Switch
                checked={todosPresenteSelecionado}
                onCheckedChange={(checked) => {
                  selecionarTodosPresente(checked)

                  alunosTurma.forEach((_, index) => {
                    formChamadaTurma.setValue(
                      `alunos.${index}.presente`,
                      checked,
                    )
                    formChamadaTurma.trigger(`alunos.${index}.presente`)
                  })
                }}
                disabled={!listaAlunosTurma || listaAlunosTurma.length === 0}
              />
            </div>
          </div>
        </>
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
                          onCheckedChange={(value) => {
                            field.onChange(value)
                            handleSelecionarTodosPresente()
                          }}
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
                className="py-8 shadow w-full text-lg bg-app-red-700 hover:bg-app-red-800 text-app-white-50 gap-4"
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
