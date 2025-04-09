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
import { removerConteudoAula } from '@/api/diario_turma'

interface DialogConfirmaExclusaoConteudoAulaProps {
  idConteudo: string
  idTurma: string
}

export function ConfirmacaoExcluirConteudoAulaDialog({
  idConteudo,
  idTurma
}: DialogConfirmaExclusaoConteudoAulaProps) {
  const queryClient = useQueryClient()

  const listaConteudoAulaTurma: AlunosTurmaType[] | undefined =
    queryClient.getQueryData(['lancamentosConteudoAula', idTurma])

  const { mutateAsync: removerConteudoAulaTurma, isPending } = useMutation({
    mutationFn: removerConteudoAula,
    onError: () => {
      toast.error(
        'Houve um problema ao desmatricular esse aluno, tente novamente!',
      )
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['lancamentosConteudoAula', idTurma],
        listaConteudoAulaTurma?.filter((conteudo) => conteudo.id !== idConteudo),
      )
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirme esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente remover este conteúdo?`}
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
              await removerConteudoAulaTurma({ idConteudo })
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
