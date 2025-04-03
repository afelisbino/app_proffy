'use client'

import {
  ChartNoAxesCombined,
  Inbox,
  Menu,
  NotebookPen,
  SlidersHorizontal,
  Speech,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SeletorTema } from '@/components/theme/seletor-tema'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

import { ReportNav } from './ReportNav'
import { UserNav } from './UserNav'
import { useQuery } from '@tanstack/react-query'
import { buscarDadosUsuario } from '@/app/components/autenticacao/api/auth'

export default function Header() {
  const pathname = usePathname()

  const dadosUsuario = useQuery({
    queryKey: ['dadosUsuarioSessaoNav'],
    queryFn: buscarDadosUsuario,
    refetchOnWindowFocus: true,
    initialData: {
      nome: '',
      email: '',
      perfil: 'PROFESSOR'
    },
  })

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center px-4 gap-4 border-b bg-background sm:pb-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="group flex h-[57px] shrink-0 items-center justify-start gap-2 rounded-full text-lg font-semibold text-primary-foreground dark:text-white md:text-base">
              <Image
                className="rounded"
                src="/logo-sp.png"
                alt="App Gestão escolar"
                width={42}
                height={42}
              />
              <span>Proffy</span>
            </div>
            {
              dadosUsuario.data.perfil === 'ADMIN' ? (
                <>
                  <Link
                    href={'/admin/chamada'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Speech
                      className={cn(
                        'size-5',
                        pathname === '/admin/chamada' && 'text-white',
                      )}
                    />
                    Chamada
                  </Link>
                  <Link
                    href={'/admin/turmas'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users
                      className={cn(
                        'size-5',
                        pathname.includes('/admin/turmas') && 'text-white',
                      )}
                    />
                    Turmas
                  </Link>
                  <Link
                    href={'/admin/diario'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <NotebookPen
                      className={cn(
                        'size-5',
                        pathname.includes('/admin/diario') && 'text-white',
                      )}
                    />
                    Diário turma
                  </Link>
                  <Link
                    href={'/admin/notificacao'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Inbox
                      className={cn(
                        'size-5',
                        pathname === '/admin/notificacao' && 'text-white',
                      )}
                    />
                    Notificações
                  </Link>
                  <Link
                    href={'/admin/painel'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ChartNoAxesCombined
                      className={cn(
                        'size-5',
                        pathname === '/admin/painel' && 'text-white',
                      )}
                    />
                    Métricas
                  </Link>
                  <Link
                    href={'/admin/escola/usuarios'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <SlidersHorizontal
                      className={cn(
                        'size-5',
                        pathname.includes('/admin/escola/') && 'text-white',
                      )}
                    />
                    Configurações
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={'/admin/chamada'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Speech
                      className={cn(
                        'size-5',
                        pathname === '/admin/chamada' && 'text-white',
                      )}
                    />
                    Chamada
                  </Link>
                  <Link
                    href={'/admin/diario'}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <NotebookPen
                      className={cn(
                        'size-5',
                        pathname.includes('/admin/diario') && 'text-white',
                      )}
                    />
                    Diário turma
                  </Link>
                </>
              )
            }

          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex-col w-full">
        <div className="flex mt-2 px-2">
          <div className="ml-auto flex items-center space-x-2">
            <ReportNav />
            <SeletorTema />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  )
}
