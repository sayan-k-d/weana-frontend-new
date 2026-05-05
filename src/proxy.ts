import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isDashboard = pathname.startsWith("/dashboard");
  const isPublicCard = pathname.startsWith("/c/");
  const isRoot = pathname === "/";

  // Root → allow
  if (isRoot) return NextResponse.next();

  // Public pages → allow
  if (isPublicCard) return NextResponse.next();

  // Protected dashboard
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Already logged in → block auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
