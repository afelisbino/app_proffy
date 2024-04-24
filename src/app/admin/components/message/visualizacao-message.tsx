import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { MensagemAlunoType } from '../../schemas/SchemaMensagemAlunos'

interface VisualizacaoMensagemProps {
  mensagem: MensagemAlunoType | null
}

export function VisualizacaoMensagem({ mensagem }: VisualizacaoMensagemProps) {
  return mensagem ? (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start py-4">
        <div className="flex items-start text-sm">
          <div className="grid gap-1">
            <div className="line-clamp-1 text-xs">{mensagem.assunto}</div>
          </div>
        </div>
        {mensagem.dataEnvio && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(mensagem.dataEnvio), 'PPpp')}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap py-4 text-sm">
        {mensagem.mensagem}
      </div>
      <Separator className="mt-auto" />
    </div>
  ) : (
    <div className="p-8 text-center text-muted-foreground">
      Nenhuma mensagem selecionada
    </div>
  )
}
