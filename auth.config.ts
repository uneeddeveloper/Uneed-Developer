import type { NextAuthConfig } from "next-auth";
import { UNLOCK_COOKIE, verifyUnlockToken } from "@/lib/admin/unlock-token";

/**
 * Edge-safe half of the auth config — used by middleware.ts, which runs on
 * the Edge runtime and can't load Prisma or bcrypt. Only the JWT session
 * cookie is read here; the actual credential check lives in auth.ts.
 *
 * On top of the login check, every admin route also requires a signed
 * "unlocked" cookie — set only after entering the master key on
 * /admin-uneed/keamanan. This mirrors the old JSONBin admin, where no data
 * showed until a Master Key was configured on that device. Whether a master
 * key even exists yet (first-run setup vs. per-device unlock) needs Prisma,
 * so that decision is deferred to the /keamanan page itself; middleware only
 * checks whether *this* device already proved it knows the current key.
 */
export const authConfig = {
  pages: {
    signIn: "/admin-uneed/login",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin-uneed/login";
      const isKeamananPage = nextUrl.pathname === "/admin-uneed/keamanan";
      const isAdminRoute = nextUrl.pathname.startsWith("/admin-uneed");

      if (!isAdminRoute) return true;
      if (isLoginPage) return isLoggedIn ? Response.redirect(new URL("/admin-uneed", nextUrl)) : true;
      if (!isLoggedIn) return false;
      if (isKeamananPage) return true;

      const unlocked = await verifyUnlockToken(request.cookies.get(UNLOCK_COOKIE)?.value);
      if (!unlocked) return Response.redirect(new URL("/admin-uneed/keamanan", nextUrl));
      return true;
    },
  },
  providers: [], // populated in auth.ts, which is never imported by middleware
} satisfies NextAuthConfig;
