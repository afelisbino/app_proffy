import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { TabelaAlunosAusentes } from '../tables/ConfirmacaoChamada/tabela-alunos-ausentes'

export function DialogFinalizacaoChamadaAluno() {
  return (
    <DialogContent className="w-full">
      <DialogHeader>
        <DialogTitle>Encerrar chamada</DialogTitle>
        <DialogDescription>
          Revise os alunos que estão ausentes
        </DialogDescription>
      </DialogHeader>
      <TabelaAlunosAusentes data={[]} />
    </DialogContent>
  )
}
