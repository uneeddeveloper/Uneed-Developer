import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe half of the auth config — used by middleware.ts, which runs on
 * the Edge runtime and can't load Prisma or bcrypt. Only the JWT session
 * cookie is read here; the actual credential check lives in auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/admin-uneed/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin-uneed/login";
      const isAdminRoute = nextUrl.pathname.startsWith("/admin-uneed");

      if (!isAdminRoute) return true;
      if (isLoginPage) return isLoggedIn ? Response.redirect(new URL("/admin-uneed", nextUrl)) : true;
      return isLoggedIn;
    },
  },
  providers: [], // populated in auth.ts, which is never imported by middleware
} satisfies NextAuthConfig;
