import { Metadata } from 'next'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SiteHeader } from '@/components/header/app-headerbar'
import { cookies } from 'next/headers'

interface AdminLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Proffy',
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar variant="inset" collapsible="icon"/>
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
  )
}
