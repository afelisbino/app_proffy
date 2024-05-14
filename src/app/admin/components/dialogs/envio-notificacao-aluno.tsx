import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EnviarMensagemAluno } from '../message/enviar-mensagem'

export function NotificarResponsavelAluno() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Notificar responsável</DialogTitle>
        <DialogDescription>
          Notifique o responsável sobre algum assunto escolar
        </DialogDescription>
      </DialogHeader>
      <EnviarMensagemAluno aluno={[]} />
    </DialogContent>
  )
}
