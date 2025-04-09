import { NextResponse, type NextRequest } from 'next/server'

const PAGE_LOGIN_USER = '/'

export function middleware(request: NextRequest) {

  if (
    !request.cookies.has('session-user') ||
    !request.cookies.has('session-company')
  ) {
    return NextResponse.redirect(new URL(PAGE_LOGIN_USER, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/classe/:path*',
  ],
}
