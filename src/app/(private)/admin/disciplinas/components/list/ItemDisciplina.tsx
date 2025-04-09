import { Trash } from 'lucide-react'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { ExcluirDisciplinaDialog } from '../alerts/ExcluirDisciplinaDialog'

interface DisciplinaProps {
  id: string
  nome: string
}

export function ItemDisciplina({ id, nome }: DisciplinaProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4 py-2 hover:bg-muted rounded px-2">
      <div className="font-medium">{nome}</div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="shadow" variant={'destructive'} size={'icon'}>
            <Trash className="size-5" />
          </Button>
        </AlertDialogTrigger>
        <ExcluirDisciplinaDialog id={id} />
      </AlertDialog>
    </div>
  )
}
