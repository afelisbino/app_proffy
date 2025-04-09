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
    removerContatoResponsavel,
    ResponseDadosAluno,
} from '@/api/matricula'

export interface RemocaoContatoResponsavelProps {
  idContato: string
  idResponsavel: string
  idAluno: string
}

export function RemocaoContatoResponsavelDialog({
  idResponsavel,
  idContato,
  idAluno,
}: RemocaoContatoResponsavelProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: excluirContato, isPending } = useMutation({
    mutationFn: removerContatoResponsavel,
    onError: (errr) => {
      toast.error('Houve um problema ao remover contato', {
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
            ResponsavelAluno: dadosMatriculaAluno?.dados?.ResponsavelAluno.map(
              (responsavel) => {
                if (responsavel.responsavel.id === data.dados?.idResponsavel) {
                  return {
                    responsavel: {
                      id: responsavel.responsavel.id,
                      nome: responsavel.responsavel.nome,
                      cpf: responsavel.responsavel.cpf,
                      TelefoneResponsavel:
                        responsavel.responsavel.TelefoneResponsavel.filter(
                          (telefone) => telefone.id !== data.dados?.id,
                        ),
                    },
                  }
                }
                return responsavel
              },
            ),
          },
        })

        toast.success('Permissão atualizada com sucesso!', {
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
          Realmente deseja remover este contato?
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
            Removendo...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await excluirContato({
                idResponsavel,
                idContato,
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
