import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isLoginPage = pathname === '/admin/login';
  const isAdminRoot = pathname === '/admin';

  if (!isAdminRoute) return NextResponse.next();

  const isAuth = request.cookies.get('admin_auth')?.value === 'true';

  // /admin root → redirect based on auth state
  if (isAdminRoot) {
    const url = request.nextUrl.clone();
    url.pathname = isAuth ? '/admin/dashboard' : '/admin/login';
    return NextResponse.redirect(url);
  }

  // Not logged in → redirect to login
  if (!isLoginPage && !isAuth) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // Already logged in + on login page → redirect to dashboard
  if (isLoginPage && isAuth) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
