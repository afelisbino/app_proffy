import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  FormularioTransferenciaAluno,
  FormularioTransferenciaAlunoProps,
} from '../forms/Turma/FormularioTransferenciaAluno'

export function DialogTransferenciaAluno({
  turmaAntiga,
  idAluno,
  idsAlunos,
}: FormularioTransferenciaAlunoProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Transferência de aluno</DialogTitle>
        <DialogDescription>
          A transferência de aluno é feita quando o aluno está matriculado em
          uma turma e deseja mudar para outra turma.
        </DialogDescription>
      </DialogHeader>
      <FormularioTransferenciaAluno
        turmaAntiga={turmaAntiga}
        idAluno={idAluno}
        idsAlunos={idsAlunos}
      />
    </DialogContent>
  )
}
