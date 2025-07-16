import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add routes that require authentication
const protectedRoutes = ['/dashboard', '/members', '/documents', '/simulation', '/gse-reports']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // In a real app, you would check for a session cookie or JWT token
    // For this example, we'll just check if the user is trying to access protected routes
    // The actual authentication is handled server-side in the layout
    
    // You could add additional checks here if needed
  }

  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}