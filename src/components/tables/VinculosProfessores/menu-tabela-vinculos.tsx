import { MoreVertical, Trash } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TurmaProfessorVinculo } from '@/schemas/turmas-professor'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { desvincularTurma } from '@/api/turmas-professor'

interface MenuTabelaVinculosProps {
  row: TurmaProfessorVinculo
}

export function MenuTabelaVinculos({ row }: MenuTabelaVinculosProps) {
  const queryClient = useQueryClient()

  const { mutate: desvincular, isPending } = useMutation({
    mutationFn: desvincularTurma,
    onSuccess: () => {
      toast.success('Vínculo removido com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['vinculos-professores'] })
    },
    onError: (error: any) => {
      toast.error('Erro ao remover vínculo', {
        description: error?.response?.data?.mensagem || error.message,
      })
    },
  })

  const handleDesvincular = () => {
    desvincular({
      idTurma: row.idTurma,
      idProfessor: row.idProfessor,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Desvincular turma
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar desvinculação</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja desvincular <strong>{row.nomeProfessor}</strong> da turma{' '}
                <strong>{row.nomeTurma}</strong>? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDesvincular}
                disabled={isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isPending ? 'Desvinculando...' : 'Desvincular'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
