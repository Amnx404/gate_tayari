import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "~/env.js";

// We're sticking with getToken in middleware
// getServerSession can't be used directly in middleware because:
// 1. Middleware runs on the edge runtime
// 2. getServerSession requires the full request/response context

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is a protected route
  const isProtectedRoute = path.startsWith("/dashboard");
  // Check if the path is an auth route
  const isAuthRoute = ["/signin", "/signup"].includes(path);
  
  // This is the recommended way to verify auth in middleware
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET || env.AUTH_SECRET ,
    raw: true,
  });
  console.log("Token in Middleware:", token);
  
  // Redirect logic
  if (isProtectedRoute && !token) {
    // If trying to access a protected route without being authenticated,
    // redirect to the signin page with a callback URL
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  if (isAuthRoute && token) {
    // If already authenticated and trying to access signin/signup,
    // redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"]
};