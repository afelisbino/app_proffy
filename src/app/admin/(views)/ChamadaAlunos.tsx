import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import CalendarioChamada from '../components/calendars/CalendarioChamada'
import { DialogFinalizacaoChamadaAluno } from '../components/dialogs/finalizacao-chamada-turma'
import ListagemChamadaAlunos from '../components/tables/ListagemChamadaAlunos'
import ListagemTurmasEscola from '../components/lists/ListagemTurmasEscola'

export default function ChamadaAlunos() {
  return (
    <div className="space-y-4">
      <section className="flex flex-col md:flex-row md:justify-between gap-2">
        <ListagemTurmasEscola />
        <CalendarioChamada />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'default'} className="w-full shadow">
              Finalizar chamada
            </Button>
          </DialogTrigger>
          <DialogFinalizacaoChamadaAluno />
        </Dialog>
      </section>
      <Separator />
      <section>
        <ListagemChamadaAlunos />
      </section>
    </div>
  )
}
