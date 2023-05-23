import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

type UserJWT = {
  email: string;
  name: string;
  expires_at: string;
  id: string;
};

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

    if (!session) {
      if (url.pathname != "/login") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      } else {
        url.pathname = `/app${url.pathname}`;
        return NextResponse.rewrite(url);
      }
    }

    if (session.expires_in <= 0) {
      await supabase.auth.refreshSession(session);
    }
    let privateKey = process.env.SUPABASE_JWT_SECRET!;
    let customSession = await new jose.SignJWT({
      email: session.user.email,
      name: session.user.user_metadata.name,
      expiry: session.expires_at?.toString(),
      id: session.user.user_metadata.sub,
      picture: session.user.user_metadata.picture,
    })
      .setProtectedHeader({
        alg: "HS256",
        type: "JWT",
      })
      .sign(jose.base64url.decode(privateKey));

    console.log(customSession);

    if (url.pathname === "/login") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    url.pathname = `/app${url.pathname}`;
    const rewrite = NextResponse.rewrite(url);
    rewrite.cookies.set("custom_session", customSession);
    return rewrite;
  }

  // rewrite root application to `/marketing` folder
  return NextResponse.rewrite(new URL(`/marketing${path}`, req.url));
}
