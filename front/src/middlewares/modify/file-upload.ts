import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, NextHandler } from "next-connect";
import multiparty from "multiparty";

interface ExtendedRequest extends NextApiRequest {
    body: any;
    files: any;
}

const fileUpload = createRouter<ExtendedRequest, NextApiResponse>();

fileUpload.use(
    async (req: ExtendedRequest, res: NextApiResponse, next: NextHandler) => {
        const form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Error parsing form data" });
            }
            req.body = fields;
            req.files = files;
            next();
        });
    }
);

export default fileUpload;
