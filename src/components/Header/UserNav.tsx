'use client'

import { useQuery } from '@tanstack/react-query'

import { buscarDadosUsuario } from '@/app/components/autenticacao/api/auth'
import { encerrarSessao } from '@/app/components/autenticacao/api/session'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { queryClient } from '@/lib/reactQueryClient'
import { capturarIniciaisNome } from '@/lib/utils'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export function UserNav() {
  const { data: dadosUsuario, isLoading } = useQuery({
    queryKey: ['dadosUsuarioSessao'],
    queryFn: buscarDadosUsuario,
    staleTime: Infinity,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!isLoading ? (
          <Button
            className="border-0 rounded-full"
            variant="outline"
            size="icon"
          >
            {capturarIniciaisNome(dadosUsuario?.nome ?? '')}
          </Button>
        ) : (
          <Skeleton className="h-10 w-10 rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isLoading ? (
          <div className="grid space-y-1">
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
          </div>
        ) : (
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
        )}
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
