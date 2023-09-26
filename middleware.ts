// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;
  const validRoles = ['admin', 'super-user', 'SEO'];

  if (!session) {
    const url = req.nextUrl.clone();

    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;

    if (requestedPage.includes('/api')) {
      return new Response(JSON.stringify({ message: 'Not authorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return NextResponse.redirect(url);
  }

  if (requestedPage.includes('/api/admin') && !validRoles.includes(session.user.role)) {
    return new Response(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (requestedPage.includes('/admin') && !validRoles.includes(session.user.role)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/checkout/:path*',
    '/orders/:path*',
    '/api/orders/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};

/* CUSTOM AUTHENTICATION MIDDLEWARE
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const token = req.cookies.get('token')?.value;

    try {
      await jose.jwtVerify(
        token || '',
        new TextEncoder().encode(process.env.JWT_SECRET_SEED || '')
        );
        
      return NextResponse.next();
    } catch (error) {
      console.error(`JWT Invalid or not signed in`, { error });
      const { protocol, host, pathname } = req.nextUrl;

      return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
    }
  }
} */
