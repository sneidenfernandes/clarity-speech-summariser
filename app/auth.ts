import {Session,User} from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { debug } from "console";




type SessionCallbackParams = {
    session: Session,
    token: JWT,
    user: User
}



export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session,token,user}: SessionCallbackParams){
        
        return session
    },
    
  },
  adapter: PrismaAdapter(prisma),
  debug: true

  
}   