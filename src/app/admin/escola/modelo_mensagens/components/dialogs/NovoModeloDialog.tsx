import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { NovoModeloForm } from '../forms/CriacaoModeloDialog'

export function DialogNovoModelo() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo modelo de mensagem</DialogTitle>
        <DialogDescription>
          Crie modelos de mensagem para ser enviado manualmente
        </DialogDescription>
      </DialogHeader>
      <NovoModeloForm />
    </DialogContent>
  )
}
