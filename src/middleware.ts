import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        // Only run middleware on routes that actually need auth checks
        '/users/:path*',           // Profile pages (check owner/admin)
        '/news/create',            // Admin only
        '/news/create/:path*',     // Admin only
        '/api/users/:path*',       // User API routes
        '/api/chat',               // Chat API (needs auth)
        // Skip everything else - static files, public pages, images, CSS, JS
    ],
}
