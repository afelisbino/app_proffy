'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { lancarConteudoAulaTurma } from '@/api/diario_turma'
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
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface FormularioConteudoAulaProps {
  idTurma: string
  listaDisciplinas: Array<DisciplinaEscolaType>
}
const schemaConteudoAula = z.object({
  realizadoEm: z.coerce.date(),
  idDisciplina: z.string().uuid(),
  idTurma: z.string().uuid(),
  descricao: z.string({
    required_error: 'A descrição do conteúdo é obrigatória',
  }),
})

export type FormDiarioConteudoAulaType = z.infer<typeof schemaConteudoAula>

export function FormularioConteudoAula({
  idTurma,
  listaDisciplinas
}: FormularioConteudoAulaProps) {
  const queryClient = useQueryClient()
  const formDiario = useForm<FormDiarioConteudoAulaType>({
    resolver: zodResolver(schemaConteudoAula),
    defaultValues: {
      realizadoEm: new Date(),
      descricao: '',
      idTurma
    },
    mode: 'onChange',
  })

  const { mutateAsync: salvarConteudo } = useMutation({
    mutationFn: lancarConteudoAulaTurma,
    onError: (erro) => {
      toast.error('Houve um problema ao lançar o conteudo, tente novamente!', {
        description: erro.message,
      })
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.msg)
        queryClient.refetchQueries({
          queryKey: ['lancamentosConteudoAula', idTurma],
          exact: true,
        })
        formDiario.reset()
      } else {
        toast.error(data.msg)
      }
    },
  })

  async function onSubmitLancamentoConteudo(data: FormDiarioConteudoAulaType) {
    await salvarConteudo(data)
  }

  return (
    <Form {...formDiario}>
      <form
        onSubmit={formDiario.handleSubmit(onSubmitLancamentoConteudo)}
        className="grid space-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                      className="border rounded-sm"
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
            name={`idDisciplina`}
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
        </div>
        <FormField
          control={formDiario.control}
          name={`descricao`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumo</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve resumo do conteúdo lecionado nessa disciplina hoje..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="flex flex-col md:flex-row items-center">
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
              className=" gap-2 shadow w-full md:w-auto"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="shadow w-full md:w-auto"
            >
              Salvar
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}