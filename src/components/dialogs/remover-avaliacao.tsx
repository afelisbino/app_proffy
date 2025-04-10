'use client'

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

import { AlunosTurmaType } from '@/schemas/SchemaAlunosTurma'
import { removerAvaliacaoAluno, removerConteudoAula, ResponseListaLancamentoNotasTurmaType } from '@/api/diario_turma'
import { registroNotasTurmaType } from '@/schemas/SchemaDiarioClasse'

interface DialogConfirmaExclusaoConteudoAulaProps {
  idConteudo: string
  idTurma: string
}

export function ConfirmacaoExcluirAvaliacaoAlunoDialog({
  idConteudo,
  idTurma
}: DialogConfirmaExclusaoConteudoAulaProps) {
  const queryClient = useQueryClient()

  const listaAvaliacaoTurma: ResponseListaLancamentoNotasTurmaType | undefined =
    queryClient.getQueryData(['lancamentosNotaTurma', idTurma])

  const { mutateAsync: removerAvaliacaoAula, isPending } = useMutation({
    mutationFn: removerAvaliacaoAluno,
    onError: () => {
      toast.error(
        'Houve um problema ao remover essa avaliação, tente novamente!',
      )
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['lancamentosNotaTurma', idTurma],
        {
          ...listaAvaliacaoTurma,
          dados: listaAvaliacaoTurma?.dados?.filter(
            (avaliacao: registroNotasTurmaType) => avaliacao.id !== idConteudo,
          ),
        },
      )
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirme esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente remover esta avaliação?`}
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
              await removerAvaliacaoAula({ idConteudo })
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
