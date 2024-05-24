import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    <Card>
      <CardHeader>
        <CardTitle>Configurações da escola</CardTitle>
        <CardDescription>
          Configurações necessárias da escola e modelos de notificações ao
          responsável
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5 md:mt-4">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 md:max-w-full xl:max-w-4xl">{children}</div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
