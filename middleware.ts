import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const publicPaths = ['/sign-in', '/sign-up', '/api/webhook'];

// Use clerkMiddleware without any parameters
export default clerkMiddleware();
 
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};