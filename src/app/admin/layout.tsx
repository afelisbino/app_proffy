import Header from '@/components/Header'
import { Sidebar } from '@/components/SidebarNav/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

import { Metadata } from 'next'

interface AdminLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Chamada Escolar | Área do administrador',
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 gap-4 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
