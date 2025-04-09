import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import {
  removerResponsavelAluno,
  ResponseDadosAluno,
} from '../../api/matricula'

export interface RemocaoVinculoResponsavelProps {
  idResponsavel: string
  idAluno: string
}

export function RemocaoVinculoResponsavelDialog({
  idResponsavel,
  idAluno,
}: RemocaoVinculoResponsavelProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: removerVinculo, isPending } = useMutation({
    mutationFn: removerResponsavelAluno,
    onError: (errr) => {
      toast.error('Houve um problema ao remover vinculo', {
        description: errr.message,
      })
    },
    onSuccess: (data) => {
      if (data.status) {
        const dadosMatriculaAluno: ResponseDadosAluno | undefined =
          queryClient.getQueryData(['matriculaAluno', idAluno])

        queryClient.setQueryData(['matriculaAluno', idAluno], {
          ...dadosMatriculaAluno,
          dados: {
            ...dadosMatriculaAluno?.dados,
            ResponsavelAluno:
              dadosMatriculaAluno?.dados?.ResponsavelAluno.filter(
                (pessoa) => pessoa.responsavel.id !== data.dados?.idResponsavel,
              ),
          },
        })

        toast.success('Vinculo removido com sucesso!', {
          description: data.msg,
        })
      } else {
        toast.error(data.msg, {
          description: data.error,
        })
      }
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirma esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          Realmente deseja remover este responsável deste aluno?
        </AlertDialogDescription>
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
            Desmatriculando...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await removerVinculo({
                idResponsavel,
                idAluno,
              })
            }}
            className="bg-app-green-300 text-app-green-700 hover:bg-app-green-400 shadow "
          >
            Confirmar
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
