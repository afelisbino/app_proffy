'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React from 'react'
import { disciplinaType } from '../../api/disciplina'

export default function ListagemDisciplinas() {
  const [disciplinaSelecionada, setDisciplinaSelecionada] =
    React.useState<string>('')
  const [open, setOpen] = React.useState(false)

  const listaDisciplina: disciplinaType = [
    {
      id: '8454348',
      nome: 'Disciplina A',
    },
    {
      id: '7565425',
      nome: 'Disciplina B',
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {disciplinaSelecionada
            ? listaDisciplina.find(
                (disciplina) => disciplina.id === disciplinaSelecionada,
              )?.nome
            : 'Selecione uma disciplina...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Filtrar pelo nome da disciplina..." />
          <CommandEmpty>Disciplina não encontrada</CommandEmpty>
          <CommandGroup>
            {listaDisciplina.map((disciplina) => (
              <CommandItem
                key={disciplina.id}
                value={disciplina.id}
                onSelect={(currentValue) => {
                  setDisciplinaSelecionada(
                    currentValue === disciplinaSelecionada ? '' : currentValue,
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    disciplinaSelecionada === disciplina.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {disciplina.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
