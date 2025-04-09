import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    DadosNovoResponsavelProps,
    FormularioNovoReponsavel,
} from '@/components/forms/Turma/FormularioNovoResponsavel'

export function AdicionaResponsavelAlunoDialog({
  idAluno,
}: DadosNovoResponsavelProps) {
  return (
    <DialogContent className="md:max-w-6xl overflow-auto">
      <DialogHeader>
        <DialogTitle>Vincular novo responsável</DialogTitle>
        <DialogDescription>
          Salva os dados do novo responsável e vincula ao aluno
        </DialogDescription>
      </DialogHeader>
      <FormularioNovoReponsavel idAluno={idAluno} />
    </DialogContent>
  )
}
