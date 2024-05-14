import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { TurmaType } from '../../schemas/SchemaAlunosTurma'
import { FormularioEdicaoTurma } from '../forms/Turma/FormularioEdicaoTurma'

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
