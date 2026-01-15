import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

import { buscarTurmas } from '@/api/turma'
import { atualizarVinculos, listarVinculos } from '@/api/turmas-professor'
import {
    AtualizarVinculosFormData,
    schemaAtualizarVinculos,
} from '@/schemas/turmas-professor'

interface GerenciarVinculosDialogProps {
  professorId: string
  professorNome: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GerenciarVinculosDialog({
  professorId,
  professorNome,
  open,
  onOpenChange,
}: GerenciarVinculosDialogProps) {
  const queryClient = useQueryClient()
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>([])

  const { data: todasTurmas, isLoading: carregandoTurmas } = useQuery({
    queryKey: ['turmasEscola'],
    queryFn: buscarTurmas,
    enabled: open,
  })

  const { data: vinculosAtuais, isLoading: carregandoVinculos } = useQuery({
    queryKey: ['vinculos-professor', professorId],
    queryFn: () => listarVinculos({ idProfessor: professorId }),
    enabled: open,
  })

  const form = useForm<AtualizarVinculosFormData>({
    resolver: zodResolver(schemaAtualizarVinculos),
    defaultValues: {
      idProfessor: professorId,
      idsTurmas: [],
    },
  })

  useEffect(() => {
    if (vinculosAtuais?.vinculos) {
      const idsVinculados = vinculosAtuais.vinculos.map((v) => v.idTurma)
      setTurmasSelecionadas(idsVinculados)
      form.setValue('idsTurmas', idsVinculados)
    }
  }, [vinculosAtuais, form])

  const { mutate: salvarVinculos, isPending } = useMutation({
    mutationFn: atualizarVinculos,
    onSuccess: () => {
      toast.success('Vínculos atualizados com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['vinculos-professores'] })
      queryClient.invalidateQueries({ queryKey: ['vinculos-professor', professorId] })
      onOpenChange(false)
    },
    onError: (error: any) => {
      toast.error('Erro ao atualizar vínculos', {
        description: error?.response?.data?.mensagem || error.message,
      })
    },
  })

  const handleToggleTurma = (turmaId: string, checked: boolean) => {
    const novaSelecao = checked
      ? [...turmasSelecionadas, turmaId]
      : turmasSelecionadas.filter((id) => id !== turmaId)

    setTurmasSelecionadas(novaSelecao)
    form.setValue('idsTurmas', novaSelecao)
  }

  const onSubmit = (data: AtualizarVinculosFormData) => {
    salvarVinculos(data)
  }

  const isLoading = carregandoTurmas || carregandoVinculos

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Gerenciar turmas do professor</DialogTitle>
          <DialogDescription>
            Selecione as turmas que serão vinculadas a{' '}
            <strong>{professorNome}</strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="idsTurmas"
              render={() => (
                <FormItem>
                  <FormLabel>Turmas disponíveis</FormLabel>
                  <FormDescription>
                    Marque as turmas que este professor irá lecionar
                  </FormDescription>

                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full rounded" />
                      <Skeleton className="h-10 w-full rounded" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px] rounded-md border p-4">
                      {todasTurmas?.map((turma) => (
                        <FormField
                          key={turma.id}
                          control={form.control}
                          name="idsTurmas"
                          render={() => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-3 border-b last:border-b-0">
                              <FormControl>
                                <Checkbox
                                  checked={turmasSelecionadas.includes(turma.id)}
                                  onCheckedChange={(checked) =>
                                    handleToggleTurma(turma.id, checked as boolean)
                                  }
                                />
                              </FormControl>
                              <div className="flex-1">
                                <FormLabel className="text-base font-medium cursor-pointer">
                                  {turma.nome}
                                </FormLabel>
                              </div>
                              {turmasSelecionadas.includes(turma.id) && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </FormItem>
                          )}
                        />
                      ))}
                    </ScrollArea>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {turmasSelecionadas.length} turma(s) selecionada(s)
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending || isLoading}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar vínculos
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
