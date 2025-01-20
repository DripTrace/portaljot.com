import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import ac from "../services/accesscontrol";

interface ExtendedRequest extends NextApiRequest {
    session?: {
        user?: {
            role?: string;
        };
    };
}

export const checkAccess =
    (resource: string, action: string, possession: string) =>
    (req: ExtendedRequest, res: NextApiResponse, next: NextHandler) => {
        let permission: { granted: boolean };
        try {
            permission = ac.permission({
                role: req.session?.user?.role || "",
                resource,
                action,
                possession,
            });
        } catch {
            permission = { granted: false };
        }

        if (!permission.granted) {
            return res.status(403).json({
                ok: false,
                message: "You are not authorized to access this resource",
            });
        }

        return next();
    };
