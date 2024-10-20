'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, Save } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { LancarNotasTurma } from '@/app/admin/api/diario_turma'
import { DisciplinaEscolaType } from '@/app/admin/escola/disciplinas/schemas/disciplina'
import { AlunosTurmaType } from '@/app/admin/schemas/SchemaAlunosTurma'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn, mascararNome } from '@/lib/utils'

interface FormularioDiarioClasseProps {
  idTurma: string
  alunosTurma: Array<AlunosTurmaType>
  listaDisciplinas: Array<DisciplinaEscolaType>
}
const schemaNotaTurma = z.object({
  tipoPeriodo: z.enum(['mensal', 'bimestral', 'trimestral', 'semestral']),
  realizadoEm: z.coerce.date(),
  periodo: z.coerce
    .number({
      required_error: 'O período é obrigatório',
    })
    .min(1, {
      message: 'O período não pode ser menor que 1',
    }),
  ano: z.string(),
  disciplinaId: z.string().uuid(),
  descricao: z.string({
    required_error: 'A descrição da avaliação é obrigatória',
  }),
  alunos: z.array(
    z.object({
      alunoId: z.string().uuid(),
      nomeAluno: z.string(),
      nota: z.coerce
        .number({
          required_error: 'A nota do aluno é obrigatória',
        })
        .min(0, {
          message: 'A nota não pode ser menor que 0',
        })
        .max(10, {
          message: 'A nota não pode ser maior que 10',
        }),
    }),
  ),
})

export type FormDiarioTurmaType = z.infer<typeof schemaNotaTurma>

export function FormularioDiarioClasse({
  idTurma,
  alunosTurma,
  listaDisciplinas,
}: FormularioDiarioClasseProps) {
  const queryClient = useQueryClient()
  const formDiario = useForm<FormDiarioTurmaType>({
    resolver: zodResolver(schemaNotaTurma),
    defaultValues: {
      disciplinaId: '',
      periodo: 1,
      realizadoEm: new Date(),
      ano: String(new Date().getFullYear()),
      tipoPeriodo: 'bimestral',
      descricao: '',
      alunos: alunosTurma.map((aluno) => {
        return {
          alunoId: aluno.id,
          nomeAluno: mascararNome(aluno.nome),
          nota: 0,
        }
      }),
    },
    mode: 'onChange',
  })

  const { fields: alunos } = useFieldArray({
    control: formDiario.control,
    name: 'alunos',
  })

  const { mutate: salvarLancamentos } = useMutation({
    mutationFn: LancarNotasTurma,
    onError: (erro) => {
      toast.error('Houve um problema ao lançar as notas, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.msg)
        queryClient.refetchQueries({
          queryKey: ['lancamentosNotaTurma', idTurma],
          exact: true,
          type: 'active',
        })
        formDiario.reset()
      } else {
        toast.error(data.msg)
      }
    },
  })

  async function onSubmitLancamentosNotas(data: FormDiarioTurmaType) {
    await salvarLancamentos({
      tipoPeriodo: data.tipoPeriodo,
      periodo: data.periodo,
      realizadoEm: data.realizadoEm,
      ano: data.ano,
      disciplinaId: data.disciplinaId,
      descricao: data.descricao,
      alunos: data.alunos,
    })
  }

  return (
    <Form {...formDiario}>
      <form
        onSubmit={formDiario.handleSubmit(onSubmitLancamentosNotas)}
        className="grid space-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormField
            control={formDiario.control}
            name="realizadoEm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Realizado em</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full text-left font-normal gap-2',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formDiario.control}
            name={`tipoPeriodo`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de período</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="bimestral">Bimestral</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="semestral">Semestral</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formDiario.control}
            name={`periodo`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Período</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormField
            control={formDiario.control}
            name={`disciplinaId`}
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Disciplina</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a disciplina" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listaDisciplinas.map((disciplina) => (
                      <SelectItem key={disciplina.id} value={disciplina.id}>
                        {disciplina.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formDiario.control}
            name={`descricao`}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Atividade</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator className={cn(alunos.length > 0 ? 'flex' : 'hidden')} />
        <ScrollArea className="max-h-52 md:max-h-72 overflow-auto">
          {alunos.map((aluno, index) => (
            <div
              key={aluno.id}
              className="flex flex-col md:flex-row py-4 gap-2"
            >
              <FormField
                control={formDiario.control}
                name={`alunos.${index}.nomeAluno`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Aluno</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={formDiario.control}
                name={`alunos.${index}.nota`}
                render={({ field }) => (
                  <FormItem className="md:w-24">
                    <FormLabel>Nota</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </ScrollArea>
        <DialogFooter className="flex flex-col md:flex-row items-center gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formDiario.reset()}
              className="shadow rounded w-full md:w-auto"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formDiario.formState.isSubmitting ? (
            <Button
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow w-full md:w-auto"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow w-full md:w-auto"
            >
              <Save className="size-5" />
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
