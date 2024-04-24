import { SeletorTema } from '@/components/theme/seletor-tema'
import { UserNav } from './UserNav'
import { ReportNav } from './ReportNav'

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
