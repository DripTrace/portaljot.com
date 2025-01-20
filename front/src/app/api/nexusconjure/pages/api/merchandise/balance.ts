import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const balanceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const connectedAccounts = await stripe.accounts
        .list({ limit: 3 })
        .catch((errors) => {
            const { message } = errors.raw;
            console.error({
                AccountRetrievalErrorMessage: message,
            });
            console.dir(
                {
                    "account-retrieval-error-logger": errors,
                },
                {
                    depth: null,
                    maxArrayLength: null,
                    colors: true,
                }
            );
            return { errorMessage: message };
        });
    if (req.method === "GET") {
        console.dir(
            {
                "account-retrieval-logger": connectedAccounts,
            },
            {
                depth: null,
                maxArrayLength: null,
                colors: true,
            }
        );
        return res.status(200);
    }
};

export default balanceHandler;
