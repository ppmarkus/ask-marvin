import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: {nextUrl} }) {
      const isLoggedIn = !!auth?.user;
      const isOnMainPage = nextUrl.pathname.startsWith('/ask-marvin');
      if (isOnMainPage) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/ask-marvin', nextUrl));
      }
      return true
    },
  }
} satisfies NextAuthConfig;
