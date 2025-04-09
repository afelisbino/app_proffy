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
    alterarPermissaoContatoResponsavel,
    ResponseDadosAluno,
} from '@/api/matricula'

interface PermissaoNotificacaoContatoResponsavelProps {
  idContato: string
  idResponsavel: string
  idAluno: string
  statusAtual: boolean
}

export function PermissaoNotificacaoResponsavelDialog({
  idContato,
  idResponsavel,
  idAluno,
  statusAtual,
}: PermissaoNotificacaoContatoResponsavelProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: alterarPermissaoNotificacao, isPending } = useMutation({
    mutationFn: alterarPermissaoContatoResponsavel,
    onError: (errr) => {
      toast.error('Houve um problema ao alterar permissão', {
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
                        responsavel.responsavel.TelefoneResponsavel.map(
                          (telefone) => {
                            if (telefone.id === data.dados?.id) {
                              return {
                                id: data.dados.id,
                                telefone: data.dados.telefone,
                                ddd: data.dados.ddd,
                                whatsapp: data.dados.whatsapp,
                              }
                            }
                            return telefone
                          },
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
          Deseja realmente alterar a permissão de notificação neste telefone?
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
            Atualizando...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await alterarPermissaoNotificacao({
                idContato,
                idResponsavel,
                statusAtual,
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
