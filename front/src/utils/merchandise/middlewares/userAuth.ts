import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { getSession } from "next-auth/react";
import { ExtendedSession } from "@/types/merchandise/ExtendedSession";

interface ExtendedRequest extends NextApiRequest {
    session?: ExtendedSession | null;
}

const userAuth = async (
    req: ExtendedRequest,
    res: NextApiResponse,
    next: NextHandler
) => {
    req.session = await getSession({ req });
    if (!req.session) {
        return res.status(403).json({
            ok: false,
            message: `User authentication required.`,
        });
    }
    return next();
};

export default userAuth;
