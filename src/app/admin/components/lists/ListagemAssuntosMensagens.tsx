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
import { TemplateMensagemType } from '../../schemas/SchemaMensagemAlunos'

export default function ListagemTemplatesAssunto() {
  const [assuntoSelecionado, setAssuntoSelecionado] = React.useState<string>('')
  const [open, setOpen] = React.useState(false)
  const listaAssuntos: Array<TemplateMensagemType> = [
    {
      id: '855',
      assunto: 'Assunto 0',
      template: '',
    },
    {
      id: '855885',
      assunto: 'Assunto 1',
      template: '',
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
          {assuntoSelecionado
            ? listaAssuntos.find((turma) => turma.id === assuntoSelecionado)
                ?.assunto
            : 'Selecione um assunto...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Filtrar pelo assunto..." />
          <CommandEmpty>Assunto não encontrado</CommandEmpty>
          <CommandGroup>
            {listaAssuntos.map((assunto) => (
              <CommandItem
                key={assunto.id}
                value={assunto.id}
                onSelect={(currentValue) => {
                  setAssuntoSelecionado(
                    currentValue === assuntoSelecionado ? '' : currentValue,
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    assuntoSelecionado === assunto.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {assunto.assunto}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
