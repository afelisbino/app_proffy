
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EditarUsuarioForm } from '@/components/forms/EditUsuarioForm'
import { UsuarioType } from '@/api/auth'

interface DialogEdicaoUsuarioProps {
  dadosUsuario: UsuarioType
}

export function DialogEdicaoSenhaUsuario({
  dadosUsuario,
}: DialogEdicaoUsuarioProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Alterar senha</DialogTitle>
        <DialogDescription>{'Alteração da senha'}</DialogDescription>
      </DialogHeader>
      <EditarUsuarioForm dadosUsuario={dadosUsuario} />
    </DialogContent>
  )
}
