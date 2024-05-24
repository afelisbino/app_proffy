'use client'

import { Inbox, SlidersHorizontal, Speech, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col bg-background">
      <div className=" p-2 flex justify-center h-[57px]">
        <Image
          className="rounded"
          src="/logo-sp.png"
          alt="App Gestão escolar"
          width={42}
          height={42}
        />
      </div>
      <nav className="grid gap-2 p-2">
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              aria-label="Home"
              asChild
              variant={'ghost'}
              className={cn(
                'rounded-full shadow',
                pathname === '/admin/painel' &&
                  'bg-app-red-600 hover:bg-app-red-700',
              )}
            >
              <Link href={'/admin/painel'}>
                <Home
                  className={cn(
                    'size-5',
                    pathname === '/admin/painel' && 'text-white',
                  )}
                />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Painel
          </TooltipContent>
        </Tooltip> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              aria-label="Chamada"
              asChild
              variant={'ghost'}
              className={cn(
                'rounded-full shadow',
                pathname === '/admin/chamada' &&
                  'bg-app-red-600 hover:bg-app-red-700 text-white',
              )}
            >
              <Link href={'/admin/chamada'}>
                <Speech
                  className={cn(
                    'size-5',
                    pathname === '/admin/chamada' && 'text-white',
                  )}
                />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Chamada do dia
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              aria-label="Mensagens"
              asChild
              variant={'ghost'}
              className={cn(
                'rounded-full shadow',
                pathname === '/admin/notificacao' &&
                  'bg-app-red-600 hover:bg-app-red-700',
              )}
            >
              <Link href={'/admin/notificacao'}>
                <Inbox
                  className={cn(
                    'size-5',
                    pathname === '/admin/notificacao' && 'text-white',
                  )}
                />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Mensagens
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              aria-label="Turmas"
              asChild
              variant={'ghost'}
              className={cn(
                'rounded-full shadow',
                pathname === '/admin/turmas' &&
                  'bg-app-red-600 hover:bg-app-red-700',
              )}
            >
              <Link href={'/admin/turmas'}>
                <Users
                  className={cn(
                    'size-5',
                    pathname === '/admin/turmas' && 'text-white',
                  )}
                />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Turmas
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={'ghost'}
              aria-label="Configurações"
              asChild
              className={cn(
                'rounded-full shadow',
                pathname.includes('/admin/escola/') &&
                  'bg-app-red-600 hover:bg-app-red-700',
              )}
            >
              <Link href={'/admin/escola/usuarios'}>
                <SlidersHorizontal
                  className={cn(
                    'size-5',
                    pathname.includes('/admin/escola/') && 'text-white',
                  )}
                />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Configurações da escola
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
