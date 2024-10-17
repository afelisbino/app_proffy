import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  DadosNovosContatosResponsavelProps,
  FormularioNovosContatosReponsavel,
} from '../forms/Turma/FormularioAdicionarNovosContatos'

export function NovosContatosResponsavelDialog({
  idAluno,
  idResponsavel,
}: DadosNovosContatosResponsavelProps) {
  return (
    <DialogContent className="md:max-w-6xl overflow-auto">
      <DialogHeader>
        <DialogTitle>Novos telefones</DialogTitle>
        <DialogDescription>
          Vincular novos telefones ao responsável
        </DialogDescription>
      </DialogHeader>
      <FormularioNovosContatosReponsavel
        idAluno={idAluno}
        idResponsavel={idResponsavel}
      />
    </DialogContent>
  )
}
