'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'
import {
  schemaRelatorio,
  type RelatorioFormData,
  type CriarRelatorioFormData,
  type AtualizarRelatorioFormData,
} from '@/schemas/SchemaRelatorios'
import { useCriarRelatorio, useAtualizarRelatorio } from '@/hooks/use-relatorios'
import type { RelatorioAluno } from '@/api/relatorios'
import type { AlunosTurmaType } from '@/api/turma'

interface RelatorioFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  relatorio?: RelatorioAluno | null
  modoEdicao?: boolean
  onSucesso?: () => void
  alunos: AlunosTurmaType[]
  isLoadingAlunos: boolean
}

export function RelatorioFormDialog({
  open,
  onOpenChange,
  relatorio,
  modoEdicao = false,
  onSucesso,
  alunos,
  isLoadingAlunos,
}: RelatorioFormDialogProps) {

  const { mutate: criarRelatorio, isPending: isCriando } = useCriarRelatorio()
  const { mutate: atualizarRelatorio, isPending: isAtualizando } = useAtualizarRelatorio()

  const form = useForm<RelatorioFormData>({
    resolver: zodResolver(schemaRelatorio),
    defaultValues: modoEdicao && relatorio
      ? {
          id: relatorio.id,
          conteudo: relatorio.conteudo,
          periodo: relatorio.periodo,
          tipoPeriodo: relatorio.tipoPeriodo,
        }
      : {
          conteudo: '',
          periodo: '',
          tipoPeriodo: 'bimestral',
          idAluno: '',
        },
  })

  // Reseta form quando dialog abre/fecha
  useEffect(() => {
    if (open && relatorio && modoEdicao) {
      form.reset({
        id: relatorio.id,
        conteudo: relatorio.conteudo,
        periodo: relatorio.periodo,
        tipoPeriodo: relatorio.tipoPeriodo,
      })
    } else if (open && !modoEdicao) {
      form.reset({
        conteudo: '',
        periodo: '',
        tipoPeriodo: 'bimestral',
        idAluno: '',
      })
    }
  }, [open, relatorio, modoEdicao, form])

  const onSubmit = (data: RelatorioFormData) => {
    if (modoEdicao) {
      atualizarRelatorio(data as AtualizarRelatorioFormData, {
        onSuccess: () => {
          toast.success('Relatório atualizado com sucesso!')
          onSucesso?.()
        },
        onError: () => {
          toast.error('Erro ao atualizar relatório')
        },
      })
    } else {
      criarRelatorio(data as CriarRelatorioFormData, {
        onSuccess: () => {
          toast.success('Relatório criado com sucesso!')
          onSucesso?.()
        },
        onError: () => {
          toast.error('Erro ao criar relatório')
        },
      })
    }
  }

  const isPending = isCriando || isAtualizando

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {modoEdicao ? 'Editar Relatório' : 'Novo Relatório de Desempenho'}
          </DialogTitle>
          <DialogDescription>
            {modoEdicao
              ? 'Atualize as informações do relatório de desempenho do aluno.'
              : 'Preencha as informações para criar um novo relatório de desempenho.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!modoEdicao && (
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
                        {alunos.map((aluno) => (
                          <SelectItem key={aluno.id} value={aluno.id}>
                            {aluno.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecione o aluno para o relatório
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipoPeriodo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Período *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
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
                control={form.control}
                name="periodo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((periodo) => (
                          <SelectItem key={periodo} value={String(periodo)}>
                            {periodo}º Período
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="conteudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo do Relatório *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o desempenho do aluno neste período..."
                      className="min-h-[200px] "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {modoEdicao ? 'Atualizando...' : 'Criando...'}
                  </>
                ) : modoEdicao ? (
                  'Atualizar'
                ) : (
                  'Criar Relatório'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
