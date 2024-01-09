import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUserByCredentials } from "@/utils/mongodb";
import { hash, compareHash } from "@/utils/functions";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "E-mail", type: "email", placeholder: "johndoe@email.com" },
                password: { label: "Password", type: "password", placeholder: "yourpassword123" }
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;
                /*const passwordHash = await hash(credentials.password);
                console.log(`Password: ${credentials.password} | Hash: ${passwordHash}`);*/
                try {
                    const user = await fetchUserByCredentials(credentials);
                    const hashMatches = await compareHash(credentials.password, user.password);
                    if (
                        user.email == credentials.email &&
                        hashMatches
                    ) {
                        return user;
                    }
                    return null;
                } catch (err) {
                    console.error("Error while authenticating user. ", err);
                }
            }
        })
    ],
    session: { strategy: "jwt" }
};