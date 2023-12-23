import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt'
import pool, { SearchEmail } from "@/app/libs/db"
import  {UserType}  from "@/types/type";


export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password')
                }


                const user = await SearchEmail(credentials.email);

         
                if (!user) {
                    throw new Error('No user found')
                }
                const passwordMatch = await bcrypt.compare(credentials.password, user.password)

                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }
                return user;
            },
        }),  
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    
}