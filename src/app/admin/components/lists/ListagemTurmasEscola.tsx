'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTurmaEscola } from '@/lib/use-case'
import { cn } from '@/lib/utils'

import { turmaType } from '../../api/turma'

interface ListagemTurmasProps {
  listaTurmas: turmaType[]
}

export default function ListagemTurmasEscola({
  listaTurmas,
}: ListagemTurmasProps) {
  const [turmaSelecionada, selecionarTurma] = useTurmaEscola()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {turmaSelecionada.selected
            ? turmaSelecionada
              ? listaTurmas.find(
                  (turma) => turma.id === turmaSelecionada.selected,
                )?.nome
              : 'Selecione uma turma...'
            : 'Selecione uma turma...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[500px]">
        <Command>
          <CommandEmpty>Turma não encontrada</CommandEmpty>
          <CommandGroup>
            {listaTurmas.map((turma) => (
              <CommandItem
                key={turma.id}
                value={turma.id}
                onSelect={(currentValue) => {
                  selecionarTurma({
                    selected:
                      currentValue === turmaSelecionada.selected
                        ? listaTurmas[0].id ?? null
                        : currentValue,
                  })
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    turmaSelecionada.selected === turma.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {turma.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
