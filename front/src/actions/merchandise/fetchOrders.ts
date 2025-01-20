"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]"; // Adjust this import path as needed
import {
    collection,
    doc,
    orderBy,
    query,
    getDocs,
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/merchandise/database/firebaseStorage";
import moment from "moment";
import Stripe from "stripe";
import { Session } from "next-auth";

// Extend the Session type to include the properties we're using
interface ExtendedSession extends Session {
    user?: {
        obinsunId?: string;
        [key: string]: any;
    };
}

export async function fetchOrders() {
    const session = (await getServerSession(
        authOptions
    )) as ExtendedSession | null;

    if (!session || !session.user?.obinsunId) {
        return { orders: [] };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-06-20", // Use the appropriate API version
    });

    const ordersRef = collection(db, "users", session.user.obinsunId, "orders");
    const ordersQuery = query(ordersRef, orderBy("timestamp", "desc"));
    const stripeOrders = await getDocs(ordersQuery);

    const orders = await Promise.all(
        stripeOrders.docs.map(
            async (order: QueryDocumentSnapshot<DocumentData>) => {
                const data = order.data();
                return {
                    id: order.id,
                    amount: data.amount,
                    amountShipping: data.amount_shipping,
                    images: data.images,
                    timestamp: moment(data.timestamp.toDate()).unix(),
                    items: (
                        await stripe.checkout.sessions.listLineItems(order.id, {
                            limit: 100,
                        })
                    ).data,
                };
            }
        )
    );

    return { orders };
}
