import '@/styles/globals.css'

import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'

import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Providers from '@/app/provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Proffy',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'antialiased bg-app-amareloEscuro-450',
          fontSans.variable,
        )}
      >
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  )
}
