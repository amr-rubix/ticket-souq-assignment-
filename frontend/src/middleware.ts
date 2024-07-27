import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authRoutes, protectedRoutes } from '@/router/routes';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete('currentUser');
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('currentUser');
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// };
