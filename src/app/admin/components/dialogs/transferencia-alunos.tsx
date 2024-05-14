import { ArrowRightLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function DialogTransferenciaAluno() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Transferência de aluno</DialogTitle>
        <DialogDescription>
          A transferência de aluno é feita quando o aluno está matriculado em
          uma turma e deseja mudar para outra turma.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant={'destructive'} type="button">
          Cancelar
        </Button>
        <Button
          className="bg-app-green-500 hover:bg-app-green-600 shadow "
          type="button"
        >
          <ArrowRightLeft />
          Transferir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
