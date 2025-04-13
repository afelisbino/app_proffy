'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function encerrarSessao() {
  const cookieStore = cookies()

  cookieStore.set('session-user','', { maxAge: 0 })
  cookieStore.set('session-company','', { maxAge: 0 })

  redirect("/login")
}

