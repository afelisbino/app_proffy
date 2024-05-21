'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function encerrarSessao() {
  cookies().delete('session-user')
  cookies().delete('session-company')

  redirect('/')
}
