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
  {
    title: 'Disciplinas',
    href: '/admin/escola/disciplinas',
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
            <aside className="flex justify-start overflow-auto">
              <SidebarNav
                className="w-auto md:w-auto"
                items={sidebarNavItems}
              />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
