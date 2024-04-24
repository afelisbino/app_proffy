import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { AlunosTurmaType } from '../../schemas/SchemaAlunosTurma'
import { Send } from 'lucide-react'
import { ptBR } from 'date-fns/locale'
import ListagemTemplatesAssunto from '../lists/ListagemAssuntosMensagens'

interface EnviarMensagemAlunoProps {
  aluno: Array<AlunosTurmaType>
}

export function EnviarMensagemAluno({ aluno }: EnviarMensagemAlunoProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start py-4">
        <div className="flex items-start">
          <ListagemTemplatesAssunto />
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          {format(new Date(), 'PPpp', { locale: ptBR })}
        </div>
      </div>
      <Separator />
      <div className="py-4">
        <form>
          <div className="grid gap-4">
            <Textarea
              className="p-4 w-full"
              placeholder={`Prezado(a) responsável...`}
            />
            <div className="flex items-center">
              <Button
                onClick={(e) => e.preventDefault()}
                size="sm"
                className="ml-auto bg-app-green-500 hover:bg-app-green-600 gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
