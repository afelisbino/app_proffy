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

import { modificarBloqueioNoticacoesAluno } from '@/api/matricula'
import { AlunosTurmaType } from '@/schemas/SchemaAlunosTurma'

interface AlteracaoStatusNotificacaoProps {
  idAluno: string
  idTurma: string
  statusNotificacaoAtual: boolean
  tituloAlerta: string
  descricacaoAlerta: string
}

export function AlteracaoStatusNotificacaoAlunoDialog({
  idAluno,
  idTurma,
  statusNotificacaoAtual,
  tituloAlerta,
  descricacaoAlerta,
}: AlteracaoStatusNotificacaoProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: alterarStatusNotificacao, isPending } = useMutation({
    mutationFn: modificarBloqueioNoticacoesAluno,
    onError: (errr) => {
      toast.error('Houve um problema ao alterar o status da notificação', {
        description: errr.message,
      })
    },
    onSuccess: (data) => {
      if (data.status) {
        const listaAlunosTurma: Array<AlunosTurmaType> | undefined =
          queryClient.getQueryData(['listaAlunosTurma', idTurma])

        queryClient.setQueryData(
          ['listaAlunosTurma', idTurma],
          listaAlunosTurma?.map((aluno) => {
            if (aluno.id === idAluno) {
              return {
                ...aluno,
                notificacaoBloqueado: data.dados?.notificacaoBloqueado,
              }
            }
            return aluno
          }),
        )

        toast.success(data.msg)
      } else {
        toast.warning(data.msg)
      }
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{tituloAlerta}</AlertDialogTitle>
        <AlertDialogDescription>{descricacaoAlerta}</AlertDialogDescription>
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
              await alterarStatusNotificacao({
                idAluno,
                status: !statusNotificacaoAtual,
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
