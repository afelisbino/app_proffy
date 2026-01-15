'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, FileText, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { schemaGerarFrequenciaPDF, type GerarFrequenciaPDFFormData } from '@/schemas/SchemaRelatorios'
import { useGerarFrequenciaPDF } from '@/hooks/use-relatorios'
import { buscarAlunosTurma } from '@/api/turma'
import { cn } from '@/lib/utils'

interface FrequenciaPDFGeneratorProps {
  idTurma: string
}

export function FrequenciaPDFGenerator({ idTurma }: FrequenciaPDFGeneratorProps) {
  const { mutate: gerarPDF, isPending } = useGerarFrequenciaPDF()

  const { data: alunos, isLoading: isLoadingAlunos } = useQuery({
    queryKey: ['alunos-turma', idTurma],
    queryFn: () => buscarAlunosTurma(idTurma),
    enabled: !!idTurma,
  })

  const form = useForm<GerarFrequenciaPDFFormData>({
    resolver: zodResolver(schemaGerarFrequenciaPDF),
    defaultValues: {
      idAluno: '',
      dataInicio: undefined,
      dataFim: undefined,
    },
  })

  const onSubmit = (data: GerarFrequenciaPDFFormData) => {
    const alunoSelecionado = alunos?.find(a => a.id === data.idAluno)

    if (!alunoSelecionado) {
      toast.error('Aluno não encontrado')
      return
    }

    // Converte Date para string no formato YYYY-MM-DD para enviar à API
    const params = {
      idAluno: data.idAluno,
      dataInicio: format(data.dataInicio, 'yyyy-MM-dd'),
      dataFim: format(data.dataFim, 'yyyy-MM-dd'),
    }

    gerarPDF(
      {
        params,
        nomeAluno: alunoSelecionado.nome,
      },
      {
        onSuccess: () => {
          toast.success('PDF de frequência gerado com sucesso!')
          form.reset()
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.mensagem || 'Erro ao gerar PDF de frequência')
        },
      }
    )
  }

  if (!idTurma) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium">Selecione uma turma</p>
          <p className="text-sm text-muted-foreground">
            Escolha uma turma para gerar relatórios de frequência
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="idAluno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aluno *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={isLoadingAlunos}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingAlunos ? "Carregando..." : "Selecione um aluno"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {alunos?.map((aluno) => (
                    <SelectItem key={aluno.id} value={aluno.id}>
                      {aluno.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecione o aluno para gerar o relatório de frequência
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="dataInicio"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Início *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
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
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataFim"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Fim *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando PDF...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Gerar PDF de Frequência
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
