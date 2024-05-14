import Image from 'next/image'

import FormularioLogin from './components/autenticacao/form/formulario-login'

export default function Home() {
  return (
    <main className="flex h-screen dark:bg-app-white-200">
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="max-w-md text-center">
          <Image
            width={'500'}
            height={'500'}
            src={'/logo-app.png'}
            alt="App Chamada Escolar"
          />
        </div>
      </div>
      <div className="w-full lg:w-2/5 py-6 flex flex-col items-center justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-1 sm:inset-0 bg-gradient-to-r from-app-red-500 to-app-red-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl rounded"></div>
          <div className="relative px-4 py-10 bg-app-white-100 shadow-lg sm:rounded-3xl sm:p-20 rounded">
            <div className="max-w-md mx-auto">
              <div className="py-8 leading-none text-gray-800 text-base md:text-lg">
                <FormularioLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
