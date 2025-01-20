"use client";

import { use } from "react";
import { useSession } from "next-auth/react";
import ContentComponent from "@/components/merchandise/ContentComponent";
import Orders from "@/components/merchandise/Orders";
import { fetchOrders } from "@/actions/merchandise/fetchOrders"; // Adjust the import path as needed

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will find a plethora of custom graphic designs attached to high-quality merchandise.";

export default function OrdersComponent() {
    const { orders } = use(fetchOrders());
    const { data: session, status } = useSession();

    return (
        <ContentComponent
            title="Profile"
            description={`${title} - ${subtitle}`}
        >
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
                    Your Orders
                </h1>

                {status === "authenticated" ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}
                <div className="mt-5 space-y-4">
                    {orders?.map(
                        ({
                            id,
                            amount,
                            amountShipping,
                            items,
                            timestamp,
                            images,
                        }) => (
                            <Orders
                                key={id}
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                items={items}
                                timestamp={timestamp}
                                images={images}
                            />
                        )
                    )}
                </div>
            </main>
        </ContentComponent>
    );
}
