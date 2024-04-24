import { ScrollArea } from '@/components/ui/scroll-area'
import { MensagemAlunoType } from '../../schemas/SchemaMensagemAlunos'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMensagemAluno } from '@/lib/use-case'

interface ListaMensagensAlunoProps {
  mensagens: Array<MensagemAlunoType>
}

export function ListagemMensagensAluno({
  mensagens,
}: ListaMensagensAlunoProps) {
  const [mensagemSelecionada, selecionarMensagem] = useMensagemAluno()

  return (
    <ScrollArea className="max-h-44 md:max-h-60 overflow-auto">
      <div className="flex flex-col py-4 pt-0">
        {mensagens.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 px-7 py-4 text-left text-sm transition-all hover:bg-muted shadow',
              mensagemSelecionada.selected === item.id && 'bg-muted',
            )}
            onClick={() =>
              selecionarMensagem({
                ...mensagemSelecionada,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.assunto}</div>
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    mensagemSelecionada.selected === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {formatDistanceToNow(new Date(item.dataEnvio), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.mensagem.substring(0, 300)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
