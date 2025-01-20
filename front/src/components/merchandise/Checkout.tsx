"use client";

import { use } from "react";
import { useSelector } from "react-redux";
import {
    selectItems,
    selectTotal,
} from "@/lib/merchandise/state/slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import axios from "axios";
import ContentComponent from "@/components/merchandise/ContentComponent";
import CheckoutProduct from "@/components/merchandise/StripeCheckout/CheckoutProduct";
import { getSessionAction } from "@/actions/merchandise/getSessionAction";

interface Item {
    id: string;
    price: number;
    url: string;
    description: string;
    image: string;
    name: string;
}

interface SessionData {
    id: string;
    user: {
        email: string;
    };
}

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will find a plethora of custom graphic designs attached to high quality merchandise.";

export default function Checkout() {
    const serverSession = use(getSessionAction()) as SessionData | null;
    const { data: clientSession } = useSession();
    const session = clientSession || serverSession;

    const items = useSelector(selectItems) as Item[];
    const total = useSelector(selectTotal) as number;

    const createCheckoutSession = async () => {
        if (!session) {
            console.error("Session is null, cannot proceed with checkout.");
            return;
        }

        try {
            const productSession = await axios.post(
                "/api/merchandise/create-product-session",
                {
                    items: items,
                    firebaseID: session?.id,
                    name: session?.user?.email,
                }
            );
            console.log(productSession.data);
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <ContentComponent
            title="Profile"
            description={`${title} - ${subtitle}`}
        >
            <div className="vs:w-full lg:flex max-w-screen-2xl mx-auto bg-gray-300/50 dark:bg-gray-800/60 rounded-[0.625em]">
                <div className="flex-grow m-5 shadow-sm rounded-[0.625em]">
                    <div className="flex flex-col p-5 space-y-10 rounded-[0.625em]">
                        <h1 className="vs:text-base mobile-l:text-lg tablet:text-3xl border-b border-gray-800/60 dark:border-gray-300/60 pb-4">
                            {items.length === 0
                                ? "Your Obincart is empty."
                                : "Obincart"}
                        </h1>

                        {items.map((item: Item, i: number) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                price={item.price}
                                url={item.url}
                                description={item.description}
                                image={item.image}
                                name={item.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-start flex-col tablet:flex-row laptop-l:flex-col bg-gray-300/70 dark:bg-gray-800/70 p-10 shadow-md rounded-[0.625em] flex-1 gap-[1em]">
                    {items.length > 0 && (
                        <>
                            <h2 className="flex flex-col whitespace-nowrap laptop-l:flex-row">
                                Subtotal {items.length} items:{" "}
                                <span className="font-bold">
                                    {" "}
                                    <Currency quantity={Number(total)} />
                                </span>
                            </h2>

                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`submit-input button mt-2 ${
                                    !session &&
                                    `border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 cursor-not-allowed`
                                }`}
                            >
                                {!session
                                    ? "Sign in to checkout"
                                    : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </ContentComponent>
    );
}
