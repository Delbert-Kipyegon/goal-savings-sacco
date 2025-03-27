import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
  "/",
];

export async function middleware(request: NextRequest) {
  // Get token from request cookies
  const token = request.cookies.get("token")?.value;

  // Get the pathname of the request (e.g. /, /protected, /login)
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const isPublicPath = publicRoutes.some((route) => path === route);

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and trying to access login/register page
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except api, _next/static, _next/image, favicon.ico
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
