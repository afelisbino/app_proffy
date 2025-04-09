import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    EnviarMensagemAluno,
    EnviarMensagemAlunoProps,
} from '@/components/message/enviar-mensagem'

export function NotificarResponsavelAluno({
  alunos,
  aluno,
}: EnviarMensagemAlunoProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Notificar responsável</DialogTitle>
        <DialogDescription>
          Notifique o responsável sobre algum assunto escolar
        </DialogDescription>
      </DialogHeader>
      <EnviarMensagemAluno aluno={aluno} alunos={alunos} />
    </DialogContent>
  )
}
