'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { schemaGerarBoletimPDF, type GerarBoletimPDFFormData } from '@/schemas/SchemaRelatorios'
import { useGerarBoletimPDF } from '@/hooks/use-relatorios'
import { buscarAlunosTurma } from '@/api/turma'
import { Separator } from '../ui/separator'

interface BoletimPDFGeneratorProps {
  idTurma: string
}

export function BoletimPDFGenerator({ idTurma }: BoletimPDFGeneratorProps) {
  const { mutate: gerarPDF, isPending } = useGerarBoletimPDF()

  const { data: alunos, isLoading: isLoadingAlunos } = useQuery({
    queryKey: ['alunos-turma', idTurma],
    queryFn: () => buscarAlunosTurma(idTurma),
    enabled: !!idTurma,
  })

  const form = useForm<GerarBoletimPDFFormData>({
    resolver: zodResolver(schemaGerarBoletimPDF),
    defaultValues: {
      idAluno: '',
      ano: new Date().getFullYear().toString(),
      tipoPeriodo: 'bimestral',
      periodos: [],
    },
  })

  const tipoPeriodoSelecionado = form.watch('tipoPeriodo')

  // Define o número máximo de períodos baseado no tipo
  const maxPeriodos = {
    mensal: 12,
    bimestral: 4,
    trimestral: 4,
    semestral: 2,
  }[tipoPeriodoSelecionado]

  const periodosDisponiveis = Array.from({ length: maxPeriodos }, (_, i) => i + 1)

  const onSubmit = (data: GerarBoletimPDFFormData) => {
    const alunoSelecionado = alunos?.find(a => a.id === data.idAluno)

    if (!alunoSelecionado) {
      toast.error('Aluno não encontrado')
      return
    }

    if (data.periodos.length === 0) {
      toast.error('Selecione pelo menos um período')
      return
    }

    gerarPDF(
      {
        params: data,
        nomeAluno: alunoSelecionado.nome,
      },
      {
        onSuccess: () => {
          toast.success('Boletim gerado com sucesso!')
          form.reset()
        },
        onError: (error: any) => {
          console.log(error)
          toast.error(error?.response?.data?.mensagem || 'Erro ao gerar boletim (nenhum registro encontrado)')
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
            Escolha uma turma para gerar boletins escolares
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
                Selecione o aluno para gerar o boletim escolar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="ano"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano Letivo *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2026"
                    maxLength={4}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoPeriodo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Período *</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    // Limpa períodos selecionados ao mudar tipo
                    form.setValue('periodos', [])
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mensal">Mensal (12)</SelectItem>
                    <SelectItem value="bimestral">Bimestral (4)</SelectItem>
                    <SelectItem value="trimestral">Trimestral (4)</SelectItem>
                    <SelectItem value="semestral">Semestral (2)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="periodos"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Períodos para Incluir no Boletim *</FormLabel>
                <FormDescription>
                  Selecione um ou mais períodos. Para análise comparativa, selecione múltiplos
                  períodos.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {periodosDisponiveis.map((periodo) => (
                  <FormField
                    key={periodo}
                    control={form.control}
                    name="periodos"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={periodo}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(String(periodo))}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, String(periodo)])
                                  : field.onChange(
                                    field.value?.filter((value) => value !== String(periodo))
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {periodo}º Período
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator/>  
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Boletim...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Gerar Boletim
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
