import { useQuery } from '@tanstack/react-query'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useMensagemAluno } from '@/lib/use-case'

import { buscarMensagensAluno } from '@/api/message'
import { ListagemMensagensAluno } from '@/components/lists/ListagemMensagensAlunos'
import { VisualizacaoMensagem } from '@/components/message/visualizacao-message'

interface MensagensEnviadasResponsavelAlunoProps {
  idAluno: string
}

export function NotificacoesAluno({
  idAluno,
}: MensagensEnviadasResponsavelAlunoProps) {
  const [mensagemSelecionada] = useMensagemAluno()

  const { data: mensagensEnviadas, isLoading } = useQuery({
    queryKey: ['mensagensEnviadasResponsavelAluno', idAluno],
    queryFn: () => buscarMensagensAluno(idAluno),
    enabled: !!idAluno,
  })

  return (
    <DialogContent className="p-0 max-w-2xl">
      <DialogHeader className="py-6 px-7">
        <DialogTitle>Notificações enviadas</DialogTitle>
        <DialogDescription>
          Todas as notificações enviadas ao aluno
        </DialogDescription>
      </DialogHeader>
      {mensagensEnviadas?.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          Nenhuma mensagem enviada
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 space-x-2 px-2">
          <div className="md:col-span-1 lg:col-span-2">
            <ListagemMensagensAluno
              mensagens={mensagensEnviadas ?? []}
              carregandoMensagens={isLoading}
            />
          </div>
          <Separator className="flex md:hidden" />
          <div className="md:col-span-2 lg:col-span-4">
            <VisualizacaoMensagem
              mensagem={
                mensagemSelecionada.selected
                  ? mensagensEnviadas?.find(
                      (mensagem) =>
                        mensagem.id === mensagemSelecionada.selected,
                    ) ?? null
                  : null
              }
            />
          </div>
        </div>
      )}
    </DialogContent>
  )
}
