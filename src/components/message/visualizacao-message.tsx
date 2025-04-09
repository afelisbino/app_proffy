import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Separator } from '@/components/ui/separator'

import { MensagemAlunoType } from '@/schemas/SchemaMensagemAlunos'

interface VisualizacaoMensagemProps {
  mensagem: MensagemAlunoType | null
}

export function VisualizacaoMensagem({ mensagem }: VisualizacaoMensagemProps) {
  return mensagem ? (
    <div className="flex flex-1 flex-col border rounded">
      <div className="flex items-start py-2 px-4">
        {mensagem.enviadoEm && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(mensagem.enviadoEm), 'PPpp', {
              locale: ptBR,
            })}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {mensagem.mensagem}
      </div>
    </div>
  ) : (
    <div className="p-4 text-center text-muted-foreground">
      Nenhuma mensagem selecionada
    </div>
  )
}
