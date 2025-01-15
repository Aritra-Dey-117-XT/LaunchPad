import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { AUTHOR_BY_EMAIL_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client" 

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {

      const userExists = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_EMAIL_ID_QUERY, {email: profile?.email})

      if(!userExists) {
        await writeClient.create({
          _type: "author",
          id: profile?.id?.toString() || profile?.sub!,
          name: user?.name,
          username: profile?.login || profile?.email?.split('@')[0],
          email: user?.email,
          image: user?.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232',
          bio: profile?.bio || "An LaunchPad User.",
          linkedInURL: "",
          instagramURL: "",
          facebookURL: "",
          X_URL: "",
          githubURL: "",
        })
      }

      return true
    },
    async jwt({ token, account, profile }) {

      if(account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_EMAIL_ID_QUERY, {email: profile?.email})
        token.id = user._id
      }

      return token
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id })
      return session
    }
  },
})