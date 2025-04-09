import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { FormularioCadastroTurma } from '../forms/Turma/FormularioCadastroTurma'

export function CadastroTurma() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastro de turmas</DialogTitle>
        <DialogDescription>
          Crie novas turmas para a sua escola
        </DialogDescription>
      </DialogHeader>
      <FormularioCadastroTurma />
    </DialogContent>
  )
}
