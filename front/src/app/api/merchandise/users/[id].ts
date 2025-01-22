import { checkAccess } from "@/utils/merchandise/middlewares/checkAccess";
import userAuth from "@/utils/merchandise/middlewares/userAuth";
import { createRouter, NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedRequest extends NextApiRequest {
    user?: any; // Replace 'any' with a more specific type if possible
}

const accessHandler = createRouter<ExtendedRequest, NextApiResponse>();

accessHandler
    .use(
        userAuth as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>
    )
    .get(
        checkAccess("users", "read:own", "") as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>,
        (req: ExtendedRequest, res: NextApiResponse) => {
            return res.send({
                ok: true,
                data: "user",
            });
        }
    )
    .put(
        checkAccess("users", "update:own", "") as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>,
        (req: ExtendedRequest, res: NextApiResponse) => {
            return res.send({
                ok: true,
                data: "user",
            });
        }
    )
    .delete(
        checkAccess("users", "delete:any", "") as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>,
        (req: ExtendedRequest, res: NextApiResponse) => {
            return res.send({
                ok: true,
                data: {},
            });
        }
    )
    .get(
        checkAccess("app", "read:any", "") as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>,
        (req: ExtendedRequest, res: NextApiResponse) => {
            return res.send({
                ok: true,
                data: "user",
            });
        }
    )
    .put(
        checkAccess("app", "update:any", "") as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>,
        (req: ExtendedRequest, res: NextApiResponse) => {
            return res.send({
                ok: true,
                data: "user",
            });
        }
    )
    .delete(
        checkAccess("app", "delete:any", "") as (
            req: ExtendedRequest,
            res: NextApiResponse,
            next: NextHandler
        ) => Promise<void>,
        (req: ExtendedRequest, res: NextApiResponse) => {
            return res.send({
                ok: true,
                data: {},
            });
        }
    );

export default accessHandler.handler();
