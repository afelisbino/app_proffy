'use client'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { DisciplinaEscolaType } from '@/schemas/disciplina'
import { FormularioConteudoAula } from '@/components/forms/Turma/FormDiarioConteudoAula'

interface DiarioConteudoDialogProps {
  turmaId: string
  listaDisciplinas: Array<DisciplinaEscolaType>
}

export function DiarioConteudoDialog({ turmaId, listaDisciplinas }: DiarioConteudoDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Conteúdo de aulas</DialogTitle>
        <DialogDescription>
          {`Aqui pode lançar o resumo de conteudo das aulas lecionada no dia`}
        </DialogDescription>
      </DialogHeader>
      <FormularioConteudoAula idTurma={turmaId} listaDisciplinas={listaDisciplinas}/>
    </DialogContent>
  )
}
