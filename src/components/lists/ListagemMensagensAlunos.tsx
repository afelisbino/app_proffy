import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useMensagemAluno } from '@/lib/use-case'
import { cn } from '@/lib/utils'

import { MensagemAlunoType } from '@/schemas/SchemaMensagemAlunos'

interface ListaMensagensAlunoProps {
  mensagens: Array<MensagemAlunoType>
  carregandoMensagens: boolean
}

export function ListagemMensagensAluno({
  mensagens,
  carregandoMensagens,
}: ListaMensagensAlunoProps) {
  const [mensagemSelecionada, selecionarMensagem] = useMensagemAluno()

  return (
    <ScrollArea className="max-h-44 md:max-h-60 overflow-auto">
      <div className="flex flex-col py-4 pt-0">
        {mensagens.length > 0 &&
          mensagens.map((mensagem) => (
            <button
              key={mensagem.id}
              className={cn(
                'rounded flex flex-col items-start gap-2 px-7 py-4 text-left text-sm transition-all hover:bg-muted shadow',
                mensagemSelecionada.selected === mensagem.id && 'bg-muted',
              )}
              onClick={() =>
                selecionarMensagem({
                  ...mensagemSelecionada,
                  selected: mensagem.id,
                })
              }
            >
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center">
                  {carregandoMensagens ? (
                    <Skeleton className="h-4 w-full rounded" />
                  ) : (
                    <div className="font-semibold line-clamp-2">
                      {mensagem.mensagem}
                    </div>
                  )}
                </div>
              </div>
              {carregandoMensagens ? (
                <>
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-12 rounded" />
                </>
              ) : (
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {mensagem.mensagem.substring(0, 300)}
                </div>
              )}
              {carregandoMensagens ? (
                <Skeleton className="h-4 w-6 rounded" />
              ) : (
                <div
                  className={cn(
                    'ml-auto text-xs',
                    mensagemSelecionada.selected === mensagem.id
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {formatDistanceToNow(new Date(mensagem.enviadoEm), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              )}
            </button>
          ))}
      </div>
    </ScrollArea>
  )
}
