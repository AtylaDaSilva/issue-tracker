import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUserByCredentials } from "@/utils/mongodb";

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
                try {
                    const user = await fetchUserByCredentials(credentials);
                    if (
                        user.email == credentials.email &&
                        user.password && credentials?.password
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