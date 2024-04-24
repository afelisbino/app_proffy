import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormularioEdicaoTurma } from '../forms/Turma/FormularioEdicaoTurma'
import { TurmaType } from '../../schemas/SchemaAlunosTurma'

interface DialogEdicaoTurmaProps {
  turma: TurmaType
}

export function EditarTurma({ turma }: DialogEdicaoTurmaProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edição de turmas</DialogTitle>
        <DialogDescription>
          Modifique o nome das turmas da sua escola
        </DialogDescription>
      </DialogHeader>
      <FormularioEdicaoTurma idTurma={turma.id} nomeTurma={turma.nome} />
    </DialogContent>
  )
}
