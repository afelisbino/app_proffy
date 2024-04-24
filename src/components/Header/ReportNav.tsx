'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { Bug, MessageCircleWarning } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

export function ReportNav() {
  return (
    <DropdownMenu>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="border-0 rounded-full"
              variant="outline"
              size="icon"
              title="Reportar o problema do sistema"
            >
              <Bug className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Reportar problema</span>
            </Button>
          </DropdownMenuTrigger>
        </DialogTrigger>
        <DialogContent className="rounded">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl">Está com problema?</DialogTitle>
            <DialogDescription className="leading-normal">
              Poxa, que situação desagradável, pode nos contar com o máximo de
              detalhes possivel qual foi o passo a passo até chegar nesse
              problema? Queremos resolver isso o mais rápido possível.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-2">
            <Textarea placeholder="Informe o problema com detalhes!" />
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="prints">Prints das telas</Label>
              <Input id="prints" type="file" multiple />
            </div>
            <DialogFooter>
              <Button
                className="ml-auto bg-app-green-500 hover:bg-app-green-600 gap-2"
                type="submit"
              >
                <MessageCircleWarning />
                Reportar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
