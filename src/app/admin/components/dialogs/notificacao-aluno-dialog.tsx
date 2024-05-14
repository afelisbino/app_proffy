import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useMensagemAluno } from '@/lib/use-case'

import { MensagemAlunoType } from '../../schemas/SchemaMensagemAlunos'
import { ListagemMensagensAluno } from '../lists/ListagemMensagensAlunos'
import { VisualizacaoMensagem } from '../message/visualizacao-message'

const mensagens: MensagemAlunoType[] = [
  {
    id: crypto.randomUUID(),
    assunto: 'Teste',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 1',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 2',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 3',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },

  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
  {
    id: crypto.randomUUID(),
    assunto: 'Teste 4',
    dataEnvio: new Date(),
    mensagem: 'Mensagem teste',
  },
]

export function NotificacoesAluno() {
  const [mensagemSelecionada] = useMensagemAluno()

  return (
    <DialogContent className="p-0">
      <DialogHeader className="py-6 px-7">
        <DialogTitle>Notificações enviadas</DialogTitle>
        <DialogDescription>
          Todas as notificações enviadas ao aluno
        </DialogDescription>
      </DialogHeader>
      <div>
        <ListagemMensagensAluno mensagens={mensagens} />
      </div>
      <Separator />
      <div className="px-4 mb-6">
        <VisualizacaoMensagem
          mensagem={
            mensagemSelecionada.selected
              ? mensagens.find(
                  (mensagem) => mensagem.id === mensagemSelecionada.selected,
                ) ?? null
              : null
          }
        />
      </div>
    </DialogContent>
  )
}
