'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { atualizarNotaAluno } from '@/api/diario_turma'
import { DisciplinaEscolaType } from '@/schemas/disciplina'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn, mascararNome } from '@/lib/utils'

export interface FormularioEdicaoDiarioClasseProps {
  idTurma: string
  id: string
  tipoPeriodo: 'mensal' | 'bimestral' | 'trimestral' | 'semestral'
  realizadoEm: Date
  periodo: number
  ano: string
  disciplinaId: string
  descricao: string
  alunoId: string
  nomeAluno: string
  nota: number
  listaDisciplinas: Array<DisciplinaEscolaType>
}

const schemaEdicaoNotaTurma = z.object({
  id: z.string().uuid(),
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
})

export type FormEdicaoDiarioTurmaType = z.infer<typeof schemaEdicaoNotaTurma>

export function FormularioEdicaoDiarioClasse({
  id,
  tipoPeriodo,
  realizadoEm,
  periodo,
  ano,
  disciplinaId,
  descricao,
  alunoId,
  nomeAluno,
  nota,
  listaDisciplinas,
  idTurma,
}: FormularioEdicaoDiarioClasseProps) {
  const queryClient = useQueryClient()
  const formEdicaoNota = useForm<FormEdicaoDiarioTurmaType>({
    resolver: zodResolver(schemaEdicaoNotaTurma),
    defaultValues: {
      id,
      disciplinaId,
      periodo,
      realizadoEm,
      ano,
      tipoPeriodo,
      descricao,
      alunoId,
      nomeAluno: mascararNome(nomeAluno),
      nota,
    },
    mode: 'onChange',
  })

  const { mutateAsync: atualizarDados } = useMutation({
    mutationFn: atualizarNotaAluno,
    onError: (erro) => {
      toast.error('Houve um problema ao atualizar a nota, tente novamente!', {
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
        formEdicaoNota.reset()
      } else {
        toast.error(data.msg)
      }
    },
  })

  async function onSubmitAtualizacaoNotas(data: FormEdicaoDiarioTurmaType) {
    await atualizarDados(data)
  }

  return (
    <Form {...formEdicaoNota}>
      <form
        onSubmit={formEdicaoNota.handleSubmit(onSubmitAtualizacaoNotas)}
        className="grid space-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <FormField
            control={formEdicaoNota.control}
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
                      className="border rounded-sm"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formEdicaoNota.control}
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
            control={formEdicaoNota.control}
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
            control={formEdicaoNota.control}
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
                    <SelectGroup>
                      {listaDisciplinas.map((disciplina) => (
                        <SelectItem key={disciplina.id} value={disciplina.id}>
                          {disciplina.nome}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formEdicaoNota.control}
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
        <div className="flex flex-col md:flex-row py-4 gap-2">
          <FormField
            control={formEdicaoNota.control}
            name={`nomeAluno`}
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
            control={formEdicaoNota.control}
            name={`nota`}
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
        <DialogFooter className="flex flex-col md:flex-row items-center gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant={'destructive'}
              onClick={() => formEdicaoNota.reset()}
              className="shadow w-full md:w-auto"
            >
              Cancelar
            </Button>
          </DialogClose>
          {formEdicaoNota.formState.isSubmitting ? (
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
