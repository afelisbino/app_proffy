import React from 'react'

import { Separator } from '@/components/ui/separator'

import { SidebarNav } from './components/Sidebar/Sidebar'

interface ConfigEscolaLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: 'Usuários',
    href: '/admin/escola/usuarios',
  },
  {
    title: 'Modelo de mensagens',
    href: '/admin/escola/modelo_mensagens',
  },
  {
    title: 'Whatsapp',
    href: '/admin/escola/whatsapp',
  },
]

export default function ConfigEscolaLayout({
  children,
}: ConfigEscolaLayoutProps) {
  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Configurações da escola
        </h2>
        <p className="text-muted-foreground">
          Configurações necessárias da escola e notificações ao responsável
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 md:max-w-full xl:max-w-4xl">{children}</div>
      </div>
    </>
  )
}
