import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

interface FormData {
    mcc: string;
    url: string;
    firstName: string;
    lastName: string;
    dob: string;
    line1: string;
    postalCode: string;
    city: string;
    state: string;
    email: string;
    phone: string;
    ssnLast4: string;
}

interface RequestBody {
    firebaseID: string;
    date: number;
    ip: string;
    formData: FormData;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { firebaseID, date, ip, formData }: RequestBody = req.body;

        console.log(formData);

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
        } = formData;

        const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
        const birthDate = datePattern.exec(dob);

        if (!birthDate) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const [_, birthYear, birthMonth, birthDay] = birthDate;

        const account = await stripe.accounts.create({
            country: "US",
            type: "custom",
            business_profile: {
                mcc: mcc,
                url: `https://${url}.com`,
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
                    day: Number(birthDay),
                    month: Number(birthMonth),
                    year: Number(birthYear),
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
            tos_acceptance: { date, ip },
            metadata: {
                firebaseID,
            },
        });

        res.status(200).json(account);
    } catch (error) {
        console.error("Error creating Stripe account:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
