'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { excluirModeloMensagem } from '@/api/message'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DialogConfirmaExclusaoProps {
  id: string
  assunto: string
}

export function ConfirmacaoExcluirModeloDialog({
  id,
  assunto,
}: DialogConfirmaExclusaoProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: removerModeloMensagem, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) => excluirModeloMensagem({ id }),
    onError: () => {
      toast.error('Houve um problema ao excluir o modelo, tente novamente!')
    },
    onSuccess: () => {
      const listaModelos:
        | Array<{
            id: string
            assunto: string
            modelo: string
          }>
        | undefined = queryClient.getQueryData(['modelosMensagensEscola'])

      queryClient.setQueryData(
        ['modelosMensagensEscola'],
        listaModelos?.filter((modelo) => modelo.id !== id),
      )
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {`Deseja realmente excluir o modelo ${assunto}?`}
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-app-red-300 text-app-red-700 hover:bg-app-red-400 shadow">
          Cancelar
        </AlertDialogCancel>
        {isPending ? (
          <Button
            className="bg-app-green-300 text-app-green-700 hover:bg-app-green-400 shadow "
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Excluindo...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await removerModeloMensagem({ id })
            }}
            className="bg-app-green-300 text-app-green-700 hover:bg-app-green-400 shadow "
          >
            Excluir
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
