'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function encerrarSessao() {
  const cookieStore = cookies()

  cookieStore.delete('session-user')
  cookieStore.delete('session-company')

  redirect("/login")
}

