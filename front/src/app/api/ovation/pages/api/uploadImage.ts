import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { processUser } from "@/utils/apiLock";
import AWS from "aws-sdk";

const upload = multer({ dest: "public/uploads" });

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }

    await new Promise<void>((resolve, reject) =>
        upload.single("image")(req as any, res as any, async (err: any) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return reject(err);
            }

            const userId = req.body.userId;
            const imageType = req.body.imageType; // Extract imageType from the request body
            const file = (req as any).file;
            const s3 = new AWS.S3();
            try {
                const outputBuffer = await sharp(file.path)
                    .withMetadata({})
                    .webp({ quality: 80 })
                    .toBuffer();
                if (!process.env.AWS_BUCKET) {
                    return res
                        .status(500)
                        .json({
                            error: "AWS_BUCKET environment variable is not set",
                        });
                }
                const params = {
                    Bucket: process.env.AWS_BUCKET, // use the bucket name from the environment variables
                    Key: `${process.env.NEXT_PUBLIC_S3_PATH}/${userId}/${file.filename}.webp`,
                    Body: outputBuffer,
                    ACL: "public-read",
                    ContentType: "image/webp",
                };
                const data = await s3.upload(params).promise();

                const filename = path.basename(data.Location);

                await fs.unlink(file.path);
                const db = await connectToDatabase();
                const dbField =
                    imageType === "profile" ? "pfp_image" : "banner";
                await db.query(`UPDATE users SET ${dbField} = ? WHERE id = ?`, [
                    filename,
                    userId,
                ]);
                res.status(200).json({
                    message: "Image uploaded successfully",
                    path: filename,
                });
            } catch (err: any) {
                res.status(500).json({ error: err.message });
                console.log(err);
            }
        })
    );
};
export default uploadImage;
