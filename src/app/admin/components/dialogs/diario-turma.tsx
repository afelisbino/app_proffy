import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { FormularioDiarioClasse } from '../forms/Turma/FormularioDiarioTurma'

export function DiarioTurmaDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Diario turma</DialogTitle>
        <DialogDescription>
          Aqui você pode visualizar o diário da turma e realizar novos registros
          de notas.
        </DialogDescription>
      </DialogHeader>
      <FormularioDiarioClasse />
    </DialogContent>
  )
}
