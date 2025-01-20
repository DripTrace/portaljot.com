"use client";

import { Suspense } from "react";
import Cart from "@/components/merchandise/Cart";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { createPrintfulWebhook } from "@/actions/merchandise/createPrintfulWebhook";

async function PrintfulWebhookLoader() {
    const printfulWebhook = await createPrintfulWebhook();
    return <Cart printfulWebhook={printfulWebhook} />;
}

export default function CartPage() {
    return (
        <ContentComponent title="Cart" description="these are your cart items">
            <Suspense fallback={<div>Loading cart...</div>}>
                <PrintfulWebhookLoader />
            </Suspense>
        </ContentComponent>
    );
}
