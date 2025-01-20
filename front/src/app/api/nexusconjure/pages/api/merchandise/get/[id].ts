import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

import { doc, updateDoc } from "firebase/firestore";
import { db, timestamp } from "@/lib/merchandise/database/firebaseStorage";

const obinsunBase = `${process.env.MERCH_API}`;

export default async function getter(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const obinsunMessage = req.headers;

    if (req.method !== "GET") {
        return res.redirect(307, obinsunBase).send({
            obinsunError:
                "You must be sign in to view access this protected api route.",
        });
    } else {
        const retrievalResponse = "sending retrieval data";
        console.dir(
            {
                "obinsun-message-logger": obinsunMessage,
            },
            {
                depth: null,
                maxArrayLength: null,
                colors: true,
            }
        );

        const accessingStripe = `${obinsunMessage.stripe_accessor}`;
        const accessingFirestore = `${obinsunMessage.firestore_accessor}`;

        const putBalance = async (sA: string, fA: string) => {
            const stripeBalanceDoc = doc(db, "users", `${fA}`);
            const getBalance = await stripe.balance.retrieve({
                stripeAccount: sA,
            });

            console.dir(
                {
                    "stripe-balance-logger": getBalance,
                },
                {
                    depth: null,
                    maxArrayLength: null,
                    colors: true,
                }
            );

            const balanceGetParams = {
                stripeBalance: {
                    balanceGotten: timestamp,
                    availableBalance: getBalance.available,
                    instantAvailableBalance: getBalance.instant_available,
                    pendingBalance: getBalance.pending,
                },
            };
            await updateDoc(stripeBalanceDoc, balanceGetParams);
        };

        return putBalance(accessingStripe, accessingFirestore).then(
            (puttingBalance) => res.send({ gotBalance: puttingBalance })
        );
    }
}
