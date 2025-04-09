'use client'

import { useQueryClient } from '@tanstack/react-query'

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import { DisciplinaEscolaType } from '@/schemas/disciplina'
import {
    FormularioEdicaoDiarioClasse,
    FormularioEdicaoDiarioClasseProps,
} from '@/components/forms/Turma/FormularioEdicaoNotaAluno'

export function EdicaoNotaAlunoDialog({
  id,
  tipoPeriodo,
  realizadoEm,
  periodo,
  ano,
  disciplinaId,
  descricao,
  alunoId,
  nomeAluno,
  nota,
  idTurma,
}: FormularioEdicaoDiarioClasseProps) {
  const queryClient = useQueryClient()

  const disciplinas: Array<DisciplinaEscolaType> | undefined =
    queryClient.getQueryData(['disciplinasEscola'])

  return (
    <DialogContent className="h-screen md:h-auto md:max-w-6xl overflow-auto">
      <DialogHeader>
        <DialogTitle>Edição de nota</DialogTitle>
        <DialogDescription>
          {`Aqui você pode editar nota de atividades de um aluno`}
        </DialogDescription>
      </DialogHeader>
      <FormularioEdicaoDiarioClasse
        alunoId={alunoId}
        id={id}
        nomeAluno={nomeAluno}
        disciplinaId={disciplinaId}
        tipoPeriodo={tipoPeriodo}
        realizadoEm={realizadoEm}
        periodo={periodo}
        ano={ano}
        descricao={descricao}
        listaDisciplinas={disciplinas ?? []}
        idTurma={idTurma}
        nota={nota}
      />
    </DialogContent>
  )
}
