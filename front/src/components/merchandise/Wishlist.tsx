"use client";

import ProductGrid from "@/components/merchandise/ProductIntegration/ProductGrid";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { useWishlistState } from "@/lib/merchandise/context/WishlistProvider";

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will fins a plethora of custom graphic designs attatched to high quality merchandise.";

export default function Wishlist() {
    const { hasItems, items } = useWishlistState();

    return (
        <ContentComponent
            title="Wishlist"
            description={`${title} - ${subtitle}`}
        >
            <div className="text-center pb-6 md:pb-12">
                <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
                    Wishlist
                </h1>
            </div>

            {hasItems ? (
                <ProductGrid products={items} />
            ) : (
                <p className="text-center text-gray-500">Your list is empty</p>
            )}
        </ContentComponent>
    );
}
