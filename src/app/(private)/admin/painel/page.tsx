import dynamic from 'next/dynamic'

export default function PagePainelAdmin() {
  const Dashboard = dynamic(() => import('@/views/Dashboard'), {
    loading: () => (
      <div className="flex items-center justify-center mt-4 h-svh">
        <div className='loader' />
      </div>
    ),
    ssr: false,
  })

  return <Dashboard />
}
