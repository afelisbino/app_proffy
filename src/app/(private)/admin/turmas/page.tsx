import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

export default function PageAdminTurma() {
  const TurmaEscola = dynamic(() => import('@/views/TurmasEscola'), {
    loading: () => (
      <div className="flex items-center justify-center mt-4 h-svh">
        <div className='loader' />
      </div>
    ),
    ssr: false,
  })

  return <TurmaEscola />
}
