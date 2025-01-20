import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import fileUpload from "@/utils/merchandise/middlewares/fileUpload";

export type Data = {
    success: boolean;
    message: string;
};

const redirectUrl = `${process.env.MERCH_API}/studio`;

interface ExtendedRequest extends NextApiRequest {
    body: any;
    files: {
        svg?: {
            headers: any;
            [key: string]: any;
        }[];
    };
}

const handler = createRouter<ExtendedRequest, NextApiResponse>();

handler.use(fileUpload);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
    console.log(req.body);
    if (req.files && req.files.svg && req.files.svg[0]) {
        console.log(req.files.svg[0].headers);
    } else {
        console.log("No SVG file found in the request");
    }

    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
    });
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
