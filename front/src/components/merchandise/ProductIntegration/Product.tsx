// src/components/merchandise/ProductIntegration/Product.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { addToBasket } from "@/lib/merchandise/state/slices/basketSlice";
import ProductVariantPicker from "../Printful/ProductVariantPicker";
import {
    useWishlistDispatch,
    useWishlistState,
} from "@/lib/merchandise/context/WishlistProvider";
import { PrintfulProduct } from "@/types/merchandise/types";

interface ProductProps extends PrintfulProduct {
    variants: Array<{
        id: string; // Ensure the id property is here
        external_id: string;
        name: string;
        currency: string;
        retail_price: number;
        files: Array<{
            type: string;
            preview_url: string;
        }>;
    }>;
}

const Product: React.FC<ProductProps> = (product) => {
    const dispatch = useDispatch();
    const { id, name, variants } = product;
    const { addItem } = useWishlistDispatch();
    const { isSaved } = useWishlistState();

    const [firstVariant] = variants;
    const oneStyle = variants.length === 1;
    const [activeVariantExternalId, setActiveVariantExternalId] = useState(
        firstVariant.external_id
    );
    const activeVariant = variants.find(
        (v) => v.external_id === activeVariantExternalId
    );
    const activeVariantFile = activeVariant?.files.find(
        ({ type }) => type === "preview"
    );

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: activeVariant?.currency || "USD",
    }).format(activeVariant?.retail_price || 0);

    const addToWishlist = () => addItem(product);

    const onWishlist = isSaved(id);

    const addItemToBasket = () => {
        if (activeVariant && activeVariantFile) {
            const basketItem = {
                id: activeVariantExternalId,
                price: activeVariant.retail_price,
                url: `${process.env.MERCH_API}/products/${activeVariantExternalId}`,
                description: activeVariant.name,
                image: activeVariantFile.preview_url,
                name: name,
            };
            dispatch(addToBasket(basketItem));
        }
    };

    return (
        <article className="glass-container h-full w-full flex flex-col relative">
            <button
                aria-label="Add to wishlist"
                className="appearance-none absolute top-0 right-0 mt-3 mr-3 text-gray-300 dark:text-gray-800 focus:text-gray-900 darkfocus:text-[#4C8EFF] hover:text-gray-800 dark:hover-text-gray-300 transition focus:outline-none"
                onClick={addToWishlist}
            >
                {onWishlist ? (
                    <div className="w-6 h-6 fill-current text-black dark:text-[#4C8EFF]">
                        <RiHeartFill />
                    </div>
                ) : (
                    <div className="w-6 h-6 fill-current text-gray-800 dark:text-gray-300">
                        <RiHeartLine />
                    </div>
                )}
            </button>
            <div className="flex items-center justify-center flex-1 w-full p-8">
                {activeVariantFile && (
                    <Image
                        src={activeVariantFile.preview_url}
                        width={250}
                        height={250}
                        alt={`${activeVariant?.name} ${name}`}
                        title={`${activeVariant?.name} ${name}`}
                        className="border border-transparent rounded-[0.625em]"
                        priority
                    />
                )}
            </div>
            <div className="flex-1 p-6 pt-0">
                <div className="text-center">
                    <p className="mb-1 font-semibold">{name}</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                        {formattedPrice}
                    </p>
                </div>
            </div>
            <div className="p-3 flex flex-col justify-center items-center gap-1">
                <ProductVariantPicker
                    value={activeVariantExternalId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setActiveVariantExternalId(e.target.value)
                    }
                    variant_count={variants}
                    disabled={oneStyle}
                />
                <button
                    className="w-full md:w-auto transition flex-shrink-0 py-2 px-4 border border-gray-300 dark:border-gray-800 hover:border-transparent shadow-sm text-sm font-medium bg-white dark:bg-gray-900 focus:text-gray-300 hover:bg-gray-800 dark:hover:bg-[#4C8EFF] hover:text-gray-300 dark:hover:text-gray-900 focus:bg-#4C8EFF focus:outline-none rounded-[0.625em]"
                    onClick={addItemToBasket}
                >
                    Add to Cart
                </button>
            </div>
        </article>
    );
};

export default Product;
