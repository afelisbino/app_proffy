import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    FormularioEdicaoMatriculaAluno,
    FormularioEdicaoMatriculaAlunoProps,
} from '@/components/forms/Turma/FormularioEdicaoMatriculaAluno'

export function EdicaoMatriculaAlunoDialog({
  idAluno,
  nomeAluno,
  cpfAluno,
  rgAluno,
  raAluno,
  dataNascimento,
}: FormularioEdicaoMatriculaAlunoProps) {
  return (
    <DialogContent className="md:max-w-6xl overflow-auto">
      <DialogHeader>
        <DialogTitle>Editar dados pessoal do aluno</DialogTitle>
        <DialogDescription>
          Altera dados da matrícula do aluno
        </DialogDescription>
      </DialogHeader>
      <FormularioEdicaoMatriculaAluno
        idAluno={idAluno}
        nomeAluno={nomeAluno}
        cpfAluno={cpfAluno}
        rgAluno={rgAluno}
        raAluno={raAluno}
        dataNascimento={dataNascimento}
      />
    </DialogContent>
  )
}
