import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { InitialAccount } from "@/types/merchandise/interfaces/objects/obinsun-objects";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2024-06-20",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const nextRequest = req.body as InitialAccount;
    const {
        transactId,
        change,
        formData,
        date,
        ip,
        cc,
        country,
        stripeId,
        object,
    } = nextRequest;

    if (
        !transactId ||
        !change ||
        !date ||
        !ip ||
        !cc ||
        !stripeId ||
        !formData
    ) {
        return res
            .status(400)
            .json({ error: "Missing required fields in the request." });
    }

    const {
        mcc,
        url,
        firstName,
        lastName,
        dob,
        line1,
        postalCode,
        city,
        state,
        email,
        phone,
        ssnLast4,
        currency,
        routing_number,
        account_number,
        number,
        exp_month_year,
        cvc,
        bankName,
        cardName,
    } = formData;

    switch (change) {
        case "create-custom-account":
            if (
                !firstName ||
                !lastName ||
                !dob ||
                !line1 ||
                !city ||
                !state ||
                !postalCode ||
                !email ||
                !phone
            ) {
                return res
                    .status(400)
                    .json({
                        error: "Missing required fields for custom account creation.",
                    });
            }

            const [birthYear, birthMonth, birthDay] = dob
                .split("-")
                .map(Number);

            try {
                await stripe.accounts.create({
                    country: cc,
                    type: "custom",
                    business_profile: {
                        mcc,
                        url: url ? `https://${url}.com` : undefined,
                    },
                    business_type: "individual",
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                    },
                    individual: {
                        first_name: firstName,
                        last_name: lastName,
                        dob: {
                            day: birthDay,
                            month: birthMonth,
                            year: birthYear,
                        },
                        address: {
                            line1,
                            city,
                            state,
                            postal_code: postalCode,
                        },
                        email,
                        phone,
                        ssn_last_4: ssnLast4,
                    },
                    tos_acceptance: {
                        date: Math.floor(date / 1000),
                        ip,
                    },
                    metadata: {
                        transactId,
                        change,
                    },
                });
                res.status(200).json({
                    message: "Custom account created successfully",
                });
            } catch (error) {
                const stripeError = error as Stripe.StripeRawError;
                res.status(500).json({
                    error: `Error creating custom account: ${stripeError.message}`,
                });
            }
            break;

        case "create-external-account":
            if (object === "bank_account") {
                // ... (bank account code remains the same)
            } else if (object === "card") {
                if (!currency || !number || !exp_month_year || !cvc) {
                    return res
                        .status(400)
                        .json({ error: "Missing required card details." });
                }

                const [expYear, expMonth] = exp_month_year
                    .split("-")
                    .map(Number);

                try {
                    const cardToken = await stripe.tokens.create({
                        card: {
                            number: number,
                            exp_month: expMonth.toString(),
                            exp_year: expYear.toString(),
                            cvc: cvc,
                        },
                    } as Stripe.TokenCreateParams);

                    await stripe.accounts.createExternalAccount(stripeId, {
                        external_account: cardToken.id,
                        metadata: { transactId, cardName: cardName || "" },
                    });
                    res.status(200).json({
                        message: "Card added successfully",
                    });
                } catch (error) {
                    const stripeError = error as Stripe.StripeRawError;
                    res.status(500).json({
                        error: `Error adding card: ${stripeError.message}`,
                    });
                }
            } else {
                return res
                    .status(400)
                    .json({
                        error: "Invalid object type for external account creation.",
                    });
            }
            break;

        default:
            res.status(400).json({ error: `Unhandled action ${change}` });
            break;
    }
};
