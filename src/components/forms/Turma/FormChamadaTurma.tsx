import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
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
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AlunosTurmaType } from '@/schemas/SchemaAlunosTurma'
import { realizarChamadaTurma, verificarChamadaTurmaRealizada } from '@/api/turma'
import { cn, mascararNome } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ListaAlunosChamadaProps {
  turmaId: string
  listaAlunosTurma: Array<AlunosTurmaType>
  carregandoAlunos: boolean
}

const schemaFormChamadaTurma = z.object({
  turma: z.string().uuid(),
  dataChamada: z.coerce.date(),
  alunos: z.array(
    z.object({
      idAluno: z.string().uuid(),
      presente: z.coerce.boolean(),
      nomeAluno: z.string(),
    }),
  ),
})

export type ChamadaTurmaType = z.infer<typeof schemaFormChamadaTurma>

export function FormChamadaAlunos({
  turmaId,
  listaAlunosTurma,
  carregandoAlunos
}: ListaAlunosChamadaProps) {
  const [todosPresenteSelecionado, selecionarTodosPresente] = useState(false)
  const formChamadaTurma = useForm<ChamadaTurmaType>({
    resolver: zodResolver(schemaFormChamadaTurma),
    defaultValues: {
      turma: turmaId,
      dataChamada: new Date(),
      alunos: listaAlunosTurma.length > 0
        ? listaAlunosTurma.map((aluno) => {
          return {
            idAluno: aluno.id,
            presente: false,
            nomeAluno: mascararNome(aluno.nome),
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
    mutationFn: ({ turma, alunos, dataChamada }: ChamadaTurmaType) =>
      realizarChamadaTurma({ turma, alunos, dataChamada }),
    onError: (erro) => {
      toast.error('Houve um problema ao encerrar a chamada, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: () => {
      toast.success('Chamada encerrada com sucesso!')
      selecionarTodosPresente(false)
      formChamadaTurma.reset()
    },
  })

  const finalizarChamada = async (dadosChamada: ChamadaTurmaType) => {
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

  const dataChamada = useMemo(() => {
    return formChamadaTurma.watch('dataChamada')
  }, [formChamadaTurma.watch('dataChamada')])

  const verificaChamadaRealizada = useQuery({
    queryKey: ['verifica-chamada-turma', turmaId, dataChamada],
    queryFn: () => verificarChamadaTurmaRealizada({
      turma: turmaId,
      dataChamada: new Date(dataChamada),
    }),
    enabled: !!turmaId && !!dataChamada,
    staleTime: Infinity
  })

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
      {
        (!verificaChamadaRealizada.isFetching && verificaChamadaRealizada?.data?.chamada) && (
          <Alert variant={'destructive'}>
            <AlertTitle>{"Atenção!"}</AlertTitle>
            <AlertDescription className=''>{verificaChamadaRealizada.data.msg}</AlertDescription>
          </Alert>
        )
      }
      <Form {...formChamadaTurma}>
        <form
          className="space-y-4"
          onSubmit={formChamadaTurma.handleSubmit(finalizarChamada)}
        >
          {alunosTurma.length > 0 && (
            <>
              <div className="flex-1 justify-center md:flex md:flex-row md:justify-end">
                <FormField
                  control={formChamadaTurma.control}
                  name="dataChamada"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'max-w-sm md:w-auto justify-start text-left font-normal gap-2',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon />
                            {field.value ? format(field.value, "PPP", {
                              locale: ptBR
                            }) : <span>Seleciona uma data</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                          <Calendar
                            className="border rounded-sm"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date()
                            }
                            locale={ptBR}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    disabled={!listaAlunosTurma || listaAlunosTurma.length === 0 || (!verificaChamadaRealizada.isFetching && verificaChamadaRealizada?.data?.chamada)}
                  />
                </div>
              </div>
            </>
          )}

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
                          disabled={(!verificaChamadaRealizada.isFetching && verificaChamadaRealizada?.data?.chamada)}
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
                  alunosTurma.length === 0 ||
                  (!verificaChamadaRealizada.isFetching && verificaChamadaRealizada?.data?.chamada)
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
