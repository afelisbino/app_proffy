import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

export default function PageAdminTurma() {
  const TurmaEscola = dynamic(() => import('../(views)/TurmasEscola'), {
    loading: () => (
      <div className="flex justify-center mt-4">
        <Loader2 className="animate-spin" />
      </div>
    ),
    ssr: false,
  })

  return <TurmaEscola />
}
