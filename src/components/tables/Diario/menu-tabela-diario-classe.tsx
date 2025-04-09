'use client'

import { MoreVertical, Pencil } from 'lucide-react'

import { registroNotasTurmaType } from '@/schemas/SchemaDiarioClasse'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { EdicaoNotaAlunoDialog } from '../../dialogs/edicao-nota-dialog'

interface MenuTabelaNotasAlunoProps {
  dadosNota: registroNotasTurmaType
}

export function MenuTabelaDiarioAluno({
  dadosNota,
}: MenuTabelaNotasAlunoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px]">
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
              }}
              className=" gap-2"
            >
              <Pencil className="size-5" />
              Editar nota
            </DropdownMenuItem>
          </DialogTrigger>
          <EdicaoNotaAlunoDialog
            idTurma={dadosNota.turmaId}
            alunoId={dadosNota.alunoId}
            nomeAluno={dadosNota.aluno}
            disciplinaId={dadosNota.disciplinaId}
            periodo={Number(dadosNota.periodo)}
            realizadoEm={new Date(dadosNota.lancamento)}
            ano={dadosNota.ano}
            tipoPeriodo={dadosNota.tipoPeriodo}
            descricao={dadosNota.descricao}
            nota={dadosNota.nota}
            id={dadosNota.id}
            listaDisciplinas={[]}
          />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
