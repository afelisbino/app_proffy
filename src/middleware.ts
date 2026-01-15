import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const sessionUserCookie = request.cookies.get('session-user')
  const sessionSchoolCookie = request.cookies.get('session-company')
  const pathname = request.nextUrl.pathname

  // Se não tem cookie de sessão e não está na página de login, redireciona para login
  if ((!sessionUserCookie?.value || !sessionSchoolCookie?.value) && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se tem cookie de sessão e está na página de login, redireciona para dashboard
  if (sessionUserCookie?.value && sessionSchoolCookie?.value && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
  ],
}
