import { SeletorTema } from '@/components/theme/seletor-tema'

import { ReportNav } from './ReportNav'
import { UserNav } from './UserNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-[57px] flex bg-background border-b">
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
