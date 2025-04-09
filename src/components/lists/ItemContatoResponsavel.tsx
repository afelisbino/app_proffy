import { Megaphone, MegaphoneOff, Trash } from 'lucide-react'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatarNumeroTelefone } from '@/lib/utils'

import { ContatoResponsavelType } from '../../api/matricula'
import { PermissaoNotificacaoResponsavelDialog } from '../dialogs/alteracao-permissao-notificacao'
import { RemocaoContatoResponsavelDialog } from '../dialogs/remover-contato-responsavel'

export interface ContatoResponsavelProps {
  idAluno: string
  idResponsavel: string
  contato: ContatoResponsavelType
}

export function ItemContatoResponsavel({
  idAluno,
  contato,
  idResponsavel,
}: ContatoResponsavelProps) {
  return (
    <div className="flex-1 items-center justify-between gap-4 py-2 hover:bg-muted rounded px-2">
      <div className="grid">
        <div className="flex flex-row justify-between gap-2 items-center">
          <span className="font-medium">{`(${contato.ddd}) ${formatarNumeroTelefone(contato.telefone)}`}</span>

          <div className="space-x-2">
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    {contato.whatsapp ? (
                      <Button
                        className="shadow"
                        variant={'destructive'}
                        size={'icon'}
                      >
                        <MegaphoneOff className="size-5" />
                      </Button>
                    ) : (
                      <Button className="shadow" size={'icon'}>
                        <Megaphone className="size-5" />
                      </Button>
                    )}
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {contato.whatsapp
                      ? 'Desativar notificações'
                      : 'Ativar notificações'}
                  </p>
                </TooltipContent>
              </Tooltip>
              <PermissaoNotificacaoResponsavelDialog
                idAluno={idAluno}
                idContato={contato.id}
                idResponsavel={idResponsavel}
                statusAtual={contato.whatsapp}
              />
            </AlertDialog>
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="shadow"
                      variant={'destructive'}
                      size={'icon'}
                    >
                      <Trash className="size-5" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remover contato</p>
                </TooltipContent>
              </Tooltip>
              <RemocaoContatoResponsavelDialog
                idAluno={idAluno}
                idContato={contato.id}
                idResponsavel={idResponsavel}
              />
            </AlertDialog>
          </div>
        </div>
        {contato.whatsapp && (
          <span className="font-bold text-lg">
            Recebe notificações do aluno
          </span>
        )}
      </div>
    </div>
  )
}
