import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { excluirDisciplina } from '@/api/escola'
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
import { DisciplinaEscolaType } from '@/schemas/disciplina'

interface ExcluirDisciplinaDialogProps {
  id: string
}

export function ExcluirDisciplinaDialog({ id }: ExcluirDisciplinaDialogProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: removerDisciplina, isPending } = useMutation({
    mutationFn: excluirDisciplina,
    onError: () => {
      toast.error('Houve um problema ao salvar a disciplina, tente novamente!')
    },
    onSuccess: (data) => {
      const listaDisciplina: Array<DisciplinaEscolaType> | undefined =
        queryClient.getQueryData(['listaDisciplinaEscola'])

      queryClient.setQueryData(
        ['listaDisciplinaEscola'],
        listaDisciplina?.filter((disciplina) => disciplina.id !== data.id),
      )

      toast.success('Disciplina removido com sucesso!')
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirma esta ação?</AlertDialogTitle>
        <AlertDialogDescription>
          {`Deseja realmente excluir essa disciplina?`}
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
            Excluindo...
          </Button>
        ) : (
          <AlertDialogAction
            onClick={async () => {
              await removerDisciplina({ id })
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
