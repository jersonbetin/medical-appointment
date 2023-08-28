import { NextRequest, NextResponse } from 'next/server';

import { protectedRoutes, authRoutes } from '@/router/routes';
import { TOKEN } from '@/utils/constants';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(TOKEN)?.value;
  const currentPath = request.nextUrl.pathname;

  if (protectedRoutes.includes(currentPath) && !currentUser) {
    request.cookies.delete(TOKEN);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.includes(currentPath) && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
