import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run Supabase auth on protected routes
  // Public pages (/, /services, /gallery etc.) bypass completely — no timeout risk
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin");

  if (!isProtected) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  // Only intercept protected routes — NOT every page request
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
