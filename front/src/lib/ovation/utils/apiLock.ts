// utils/processUser.ts
import authOptions from "@/pages/api/auth/next-auth.options";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
// import  authOptions  from '../pages/api/auth/next-auth.options';

export async function processUser(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, {
        secret: authOptions.secret,
    });
    if (!session) {
        return null;
    }

    return session.user;
}
