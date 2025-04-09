import '@/styles/globals.css'

import { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SiteHeader } from '@/components/header/app-headerbar'
import { cookies } from 'next/headers'
import { cn } from '@/lib/utils'
import Providers from '@/app/provider'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

interface AdminLayoutProps {
	children: React.ReactNode
}

export const metadata: Metadata = {
	title: 'Proffy | Gestão Escolar',
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

	return (
		<html lang="pt-BR">
			<body
				className={cn(
					'flex min-h-screen w-full flex-col bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Providers>
						<SidebarProvider defaultOpen={defaultOpen}>
							<AppSidebar variant="inset" collapsible="icon" />
							<SidebarInset>
								<SiteHeader />
								<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
							</SidebarInset>
						</SidebarProvider>
					</Providers>
				</ThemeProvider>
				<Toaster richColors />
			</body>
		</html>
	)
}
