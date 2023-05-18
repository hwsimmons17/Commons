import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host") || "commons.place";

  const path = url.pathname;

  const currentHost = hostname
    .replace(`.commons.place`, "")
    .replace(`.commons-smoky.vercel.app`, "")
    .replace(`.localhost:3000`, "");

  if (currentHost == "app") {
    const res = NextResponse.next();
    const supabase = createMiddlewareSupabaseClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (url.pathname === "/login" && session) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (url.pathname != "/login" && !session) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // rewrite root application to `/marketing` folder
  return NextResponse.rewrite(new URL(`/marketing${path}`, req.url));
}
