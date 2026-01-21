import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
    const supabase = await createClient();

    if (request.url.endsWith("signin") || request.url.endsWith("signup")) {
        if ((await supabase.auth.getSession()).data.session) {
            return NextResponse.redirect(new URL("/", request.url));
        } else {
            return;
        }
    }

    if (!(await supabase.auth.getSession()).data.session) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|image|favicon.ico).*)',
  ],
}