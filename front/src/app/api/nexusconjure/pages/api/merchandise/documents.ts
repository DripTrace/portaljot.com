import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const {
            cameraImage,
            documentName,
            stripeId,
            username,
            documentAction,
        } = JSON.parse(req.body);

        console.log(cameraImage);

        const dataurl = cameraImage;
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const matches = dataurl.match(regex);
        const ext = matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, "base64");
        const documentExtension =
            `pages/api/merchandise/${documentName}.` + ext;
        fs.writeFileSync(documentExtension, buffer);

        const file = await stripe.files.create(
            {
                purpose: "account_requirement",
                file: {
                    data: fs.readFileSync(documentExtension),
                    name: `${documentName}.${ext}`,
                    type: "application/octet-stream",
                },
            },
            {
                stripeAccount: stripeId,
            }
        );

        switch (documentAction) {
            case "bank-account-ownership":
                console.log(file);

                const identityVerification = await stripe.accounts
                    .update(stripeId, {
                        documents: {
                            bank_account_ownership_verification: {
                                files: [file.id],
                            },
                        },
                        metadata: { username },
                    })
                    .catch((errors) => {
                        console.error({
                            IdentityVerificationErrorMessage:
                                errors.raw.message,
                        });
                        console.dir(
                            {
                                "identity-verification-error-logger": errors,
                            },
                            {
                                depth: null,
                                maxArrayLength: null,
                                colors: true,
                            }
                        );
                    });

                console.dir(
                    { "identity-update-directory": identityVerification },
                    {
                        depth: null,
                        colors: true,
                        maxArrayLength: null,
                    }
                );
                break;

            case "business-tax-id":
                const companyVerification = await stripe.accounts
                    .update(stripeId, {
                        company: {
                            verification: { document: { front: file.id } },
                        },
                        metadata: { username },
                    })
                    .catch((errors) => {
                        console.error({
                            IdentityVerificationErrorMessage:
                                errors.raw.message,
                        });
                        console.dir(
                            {
                                "identity-verification-error-logger": errors,
                            },
                            {
                                depth: null,
                                maxArrayLength: null,
                                colors: true,
                            }
                        );
                    });

                console.dir(
                    { "verification-update-directory": companyVerification },
                    {
                        depth: null,
                        colors: true,
                        maxArrayLength: null,
                    }
                );
                break;

            default:
                console.log(`Unhandled action type ${documentAction}`);
        }
        try {
            fs.unlinkSync(documentExtension);
            console.log("file removed");
        } catch (err) {
            console.error(err);
        }

        return res.status(200);
    }
};
