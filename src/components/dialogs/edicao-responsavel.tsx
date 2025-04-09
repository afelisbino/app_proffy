import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  DadosEdicaoResponsavelProps,
  FormularioEdicaoReponsavel,
} from '../forms/Turma/FormularioEdicaoResponsavel'

export function EdicaoResponsavelAluno({
  idAluno,
  id,
  nome,
  cpf,
}: DadosEdicaoResponsavelProps) {
  return (
    <DialogContent className="md:max-w-6xl overflow-auto">
      <DialogHeader>
        <DialogTitle>Atualizar responsável</DialogTitle>
        <DialogDescription>
          Edição de dados do responsável do aluno e salva novos contatos
        </DialogDescription>
      </DialogHeader>
      <FormularioEdicaoReponsavel
        idAluno={idAluno}
        id={id}
        nome={nome}
        cpf={cpf}
      />
    </DialogContent>
  )
}
