import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name: string;
        };
        token: JWT;
        username: string;
    }
    interface User extends DefaultUser {
        username: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        username: string;
    }
}

const authOptions = {
    secret: process.env.SECRET,

    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt({ token, user, account }: { token: JWT; user: any; account: any }) {
            console.log("token: ", token);
            console.log("user: ", user);
            console.log("account: ", account);
            if (account && account.access_token) {
                console.log("account: ", account);
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        session({ session, token }: { session: Session; token: JWT }) {
            console.log("session: ", session);
            console.log("token: ", token);
            session.user.id = token.id;
            session.username = token.username;

            return session;
        },
    },
};
export default authOptions;
