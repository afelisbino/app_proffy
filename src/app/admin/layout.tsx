import { Metadata } from 'next'

import Header from '@/components/Header'
import { Sidebar } from '@/components/SidebarNav/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

interface AdminLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Chamada Escolar | Área do administrador',
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <TooltipProvider>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </TooltipProvider>
  )
}
