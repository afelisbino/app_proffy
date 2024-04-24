import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function MatriculaAlunoDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Matricular aluno</DialogTitle>
        <DialogDescription>
          Matricule o aluno e vincule ele à turma correta
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}
