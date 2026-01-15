'use client'

import { Check, X } from 'lucide-react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { useAlterarPresencaChamada } from '@/hooks/use-chamada'

interface ConfirmarAlteracaoPresencaDialogProps {
  idChamada: string
  presencaAtual: boolean
  novaPresenca: boolean
  nomeAluno: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConfirmarAlteracaoPresencaDialog({
  idChamada,
  presencaAtual,
  novaPresenca,
  nomeAluno,
  open,
  onOpenChange,
}: ConfirmarAlteracaoPresencaDialogProps) {
  const { mutate: alterarPresenca, isPending } = useAlterarPresencaChamada()

  const handleConfirmar = () => {
    alterarPresenca(
      { idChamada, presenca: novaPresenca },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      },
    )
  }

  const statusAtual = presencaAtual ? 'presente' : 'ausente'
  const novoStatus = novaPresenca ? 'presente' : 'ausente'

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar alteração de presença</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              Deseja alterar a presença do aluno <strong>{nomeAluno}</strong>?
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">De:</span>
              <Badge
                variant={presencaAtual ? 'default' : 'destructive'}
                className={
                  presencaAtual
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {presencaAtual ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Presente
                  </>
                ) : (
                  <>
                    <X className="mr-1 h-3 w-3" />
                    Ausente
                  </>
                )}
              </Badge>
              <span className="text-sm text-muted-foreground">Para:</span>
              <Badge
                variant={novaPresenca ? 'default' : 'destructive'}
                className={
                  novaPresenca
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {novaPresenca ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Presente
                  </>
                ) : (
                  <>
                    <X className="mr-1 h-3 w-3" />
                    Ausente
                  </>
                )}
              </Badge>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmar} disabled={isPending}>
            {isPending ? 'Alterando...' : 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
