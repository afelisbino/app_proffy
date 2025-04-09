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

import { desmatricularAluno } from '@/api/turma'
import { AlunosTurmaType } from '@/schemas/SchemaAlunosTurma'

interface DialogConfirmaExclusaoAlunoProps {
  idAluno: string
  idTurma: string
}

export function ConfirmacaoExcluirAlunoDialog({
  idAluno,
  idTurma,
}: DialogConfirmaExclusaoAlunoProps) {
  const queryClient = useQueryClient()

  const listaAlunosTurma: AlunosTurmaType[] | undefined =
    queryClient.getQueryData(['listaAlunosTurma', idTurma])

  const { mutateAsync: removerMatriculaAluno, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) => desmatricularAluno(id),
    onError: () => {
      toast.error(
        'Houve um problema ao desmatricular esse aluno, tente novamente!',
      )
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['listaAlunosTurma', idTurma],
        listaAlunosTurma?.filter((aluno) => aluno.id !== idAluno),
      )
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirme esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente desmatricular o ${listaAlunosTurma?.find((aluno) => aluno.id === idAluno)?.nome}?`}
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
              await removerMatriculaAluno({ id: idAluno })
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
