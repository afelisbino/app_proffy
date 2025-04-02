'use client'

import { UsuarioType } from '@/app/components/autenticacao/api/auth'
import { encerrarSessao } from '@/app/components/autenticacao/api/session'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { capturarIniciaisNome } from '@/lib/utils'

import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'

export function UserNav() {

  const queryClient = useQueryClient()
  const dadosUsuario: UsuarioType | undefined = queryClient.getQueryData([
    'dadosUsuarioSessao',
  ])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-0 rounded-full"
          variant="outline"
          size="icon"
        >
          {capturarIniciaisNome(dadosUsuario?.nome ?? '')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="grid space-y-1">
            <p className="text-sm font-medium leading-none">
              {dadosUsuario?.nome}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {dadosUsuario?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant={'ghost'}
            className="w-full"
            onClick={async () => {
              queryClient.clear()
              await encerrarSessao()
            }}
          >
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
