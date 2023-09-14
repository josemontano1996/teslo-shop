import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

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
}
// Only the paths declared in here will run the middleware
export const config = {
  matcher: ['/checkout/:path*'],
};
