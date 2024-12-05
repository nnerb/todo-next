// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "app/lib/prisma";
// import NextAuth, { DefaultSession } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt";

// declare module "next-auth" {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       name: string
//       /**
//        * By default, TypeScript merges new interface properties and overwrites existing ones.
//        * In this case, the default session user properties will be overwritten,
//        * with the new ones defined above. To keep the default session user properties,
//        * you need to add them back into the newly declared interface.
//        */
//     } & DefaultSession["user"]
//   }
// }
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [  
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'email'},
//         password: { label: 'password', type: 'password' },
//       },
//       async authorize(credentials) {

//         if (!credentials?.email || typeof credentials.email !== 'string') {
//           throw new Error('Invalid Credentials: Missing or invalid email');
//         }
//         if (!credentials?.password || typeof credentials.password !== 'string') {
//           throw new Error('Invalid Credentials: Missing or invalid password');
//         }
  
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid Credentials');
//         }
  
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         })
  
//         if (!user?.email || !user.password) {
//           throw new Error('Invalid Credentials')
//         }
  
//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.password,
//         )
  
//         if (!isCorrectPassword) {
//           throw new Error('Invalid Credentials')
//         }
  
//         return {
//           id: user.id.toString(),
//           user,
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60,
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) { 
//         token.id = user.id
//       }
//       return token
//     },
//     session({ session, token }) {
//       session.user.id = token.id as string
//       return session
//     },
//   },
//   pages: {
//     signIn: '/sign-in',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development',
// });

// export { handlers as GET, handlers as POST };
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import type { Provider } from "next-auth/providers"
// import { prisma } from "./app/lib/prisma"
// import bcrypt from "bcrypt";
// import authConfig from "auth.config";
 
// const providers: Provider[] = [
//   Credentials({
//     credentials: { 
//       email: { label: 'email', type: 'email' },
//       password: { label: "password", type: "password" }
//      },
//     async authorize(c) {
      
//       if (!c?.email || !c?.password) {
//         throw new Error('Invalid Credentials');
//       }
//       const user = await prisma.user.findUnique({
//         where: {
//           email: c.email as string
//         }
//       })
//       if (!user?.email || !user.password) {
//         throw new Error('Invalid Credentials')
//       }

//       const isCorrectPassword = await bcrypt.compare(
//         c.password as string,
//         user.password,
//       ) 

//       if (!isCorrectPassword) {
//         throw new Error('Invalid Credentials')
//       }

//       return {
//         id: user.id.toString(),
//         user,
//       }
//     },
//   }),
// ]
 
// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== "credentials")
 
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers,
//   session: {
//   strategy: "jwt",
//   maxAge: 60 * 60,
//   },
//   // callbacks: {
//   //   jwt({ token, user }) {
//   //     if (user) { 
//   //       token.id = user.id
//   //     }
//   //     return token
//   //   },
//   //   session({ session, token }) {
//   //     session.user.id = token.id as string
//   //     return session
//   //   },
//   // },
// })

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "app/lib/prisma"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})