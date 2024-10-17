import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ContatoResponsavelType } from '../../api/matricula'
import { ItemContatoResponsavel } from '../lists/ItemContatoResponsavel'

interface ListaContatosProps {
  idAluno: string
  idResponsavel: string
  contatos: Array<ContatoResponsavelType>
}

export function ListaContatosResponsaveisDialog({
  idAluno,
  idResponsavel,
  contatos,
}: ListaContatosProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Contatos</DialogTitle>
        <DialogDescription>
          Lista de contatos dos responsáveis do aluno
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="w-full h-[250px] overflow-auto">
        {contatos.map((contato) => (
          <ItemContatoResponsavel
            idAluno={idAluno}
            idResponsavel={idResponsavel}
            key={contato.id}
            contato={contato}
          />
        ))}

        {contatos.length === 0 && (
          <div className="text-center text-gray-400">
            Nenhum contato encontrado.
          </div>
        )}
      </ScrollArea>
    </DialogContent>
  )
}
