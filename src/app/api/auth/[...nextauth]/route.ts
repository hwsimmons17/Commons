import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    // ...add more providers here
  ],
});

export { handler as GET, handler as POST };
