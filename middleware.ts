import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

// Define public routes that don't require authentication
const publicRoutes = [
	"/login",
	"/register",
	"/reset-password",
	"/forgot-password",
	"/",
];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the current path is a public route
	const isPublicRoute = publicRoutes.some((route) => pathname === route);

	// Allow access to public routes without authentication
	if (isPublicRoute) {
		return NextResponse.next();
	}

	// For all other routes, check for authentication
	const token = request.cookies.get("token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	try {
		await verifyJwtToken(token);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	// Match all routes except api, _next/static, _next/image, favicon.ico
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
