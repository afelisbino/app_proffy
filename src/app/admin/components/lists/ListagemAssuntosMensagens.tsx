'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'

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
import { useModelosNotificacao } from '@/lib/use-case'
import { cn } from '@/lib/utils'

interface ListagemTemplatesAssuntoProps {
  listaAssuntos: Array<{
    id: string
    assunto: string
    modelo: string
  }>
}

export default function ListagemTemplatesAssunto({
  listaAssuntos,
}: ListagemTemplatesAssuntoProps) {
  const [modelosSelecionado, selecionarModelo] = useModelosNotificacao()
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
          {modelosSelecionado.selected
            ? listaAssuntos?.find(
                (turma) => turma.id === modelosSelecionado.selected,
              )?.assunto
            : 'Selecione um assunto...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Filtrar pelo assunto..." />
          <CommandEmpty>Assunto não encontrado</CommandEmpty>
          <CommandGroup>
            {listaAssuntos?.map((assunto) => (
              <CommandItem
                key={assunto.id}
                value={assunto.id}
                onSelect={(currentValue) => {
                  selecionarModelo({
                    selected:
                      currentValue === modelosSelecionado.selected
                        ? listaAssuntos[0].id ?? null
                        : currentValue,
                  })
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    modelosSelecionado.selected === assunto.id
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
