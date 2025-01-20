import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import axios from "axios";
import fs from "fs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { firebaseID, stripeId, personId, documentUploadUrl } = req.body;

    if (!stripeId || !documentUploadUrl) {
        return res.status(400).json({ error: "Missing required parameters." });
    }

    try {
        const downloadImage = (url: string, imagePath: string): Promise<void> =>
            axios({
                url,
                responseType: "stream",
            }).then(
                (response) =>
                    new Promise((resolve, reject) => {
                        response.data
                            .pipe(fs.createWriteStream(imagePath))
                            .on("finish", () => resolve())
                            .on("error", (e: Error) => reject(e));
                    })
            );

        const imagePath = "pages/api/merchandise/stripe/success.png";
        await downloadImage(documentUploadUrl, imagePath);

        const file = await stripe.files.create(
            {
                purpose: "account_requirement",
                file: {
                    data: fs.readFileSync(imagePath),
                    name: "success.png",
                    type: "application/octet-stream",
                },
            },
            {
                stripeAccount: stripeId,
            }
        );

        console.log(file);

        await stripe.accounts.update(stripeId, {
            company: { verification: { document: { front: file.id } } },
        });

        res.status(200).json({ success: true, fileId: file.id });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            error: "An error occurred while processing the request.",
        });
    }
};
