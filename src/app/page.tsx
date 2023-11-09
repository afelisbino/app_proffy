import FormularioLogin from '@/components/login/formularioLogin'
import Image from 'next/image'
import ImageLoginProfessor from '../assets/undraw_teacher_re_sico.svg';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-zinc-200 px-5 py-3 rounded shadow-md">
        <div className='space-y-5'>
          <Image src={ImageLoginProfessor} alt='App Chamada Escolar' />
          <h1 className="text-5xl font-bold leading-tight text-center text-[#0A2473]">
            Chamada Escolar
          </h1>
          <FormularioLogin />
        </div>

      </div>
    </main>
  )
}
