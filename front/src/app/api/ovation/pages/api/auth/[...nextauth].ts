"use server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/utils/database";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
// import authOptions from "@/pages/api/auth/next-auth.options";
import authOptions from "./next-auth.options";

type MyUser = {
    id: string;
    username: string;
    email?: string;
    hashed_password?: string;
};

export default NextAuth({
    ...authOptions,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("using credentials: ", credentials);
                // Check if credentials are provided
                if (!credentials || credentials.password.length > 32) {
                    return Promise.resolve(null);
                }

                // Connect to database
                const pool = await connectToDatabase();

                if (!pool) {
                    throw new Error("Failed to connect to the database.");
                }
                // Validate username and password
                const [rows] = await pool.query(
                    "SELECT id, name, hashed_password, email, pfp_image FROM users WHERE username = ?",
                    credentials.username
                );

                const user = (rows as RowDataPacket[])[0] as MyUser;

                if (
                    user &&
                    user.hashed_password &&
                    (await bcrypt.compare(
                        credentials.password,
                        user.hashed_password.toString()
                    ))
                ) {
                    delete user.hashed_password;

                    //console.log(user);
                    return Promise.resolve(user);
                } else {
                    // If you return null or false then the credentials will be rejected
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    //database: process.env.DATABASE_URL, // adjust the path as needed
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            console.log("User:", user);
            console.log("Token:", token);
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Session:", session);
            console.log("Token:", token);
            if (session.user) {
                session.user.id = token.id;
                session.token = token;
                return Promise.resolve(session);
            }
            // Set a cookie
            //session.userCookie = session.user.id;
            //console.log("Session:", session);
            return session;
        },
    },
});
