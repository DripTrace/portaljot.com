"use client";

import React from "react";
import Product from "./Product";
import { PrintfulProduct } from "@/types/merchandise/types";

interface ProductGridProps {
    products: PrintfulProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="z-50 relative grid gap-[1.5em] grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 laptop-l:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:grid-cols-1 justify-items-center h-full w-full">
            {products.map((product) => (
                <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    type_name={product.type_name}
                    variant_count={product.variant_count}
                    currency={product.currency}
                    variants={product.variants} // Make sure to pass variants
                />
            ))}
        </div>
    );
};

export default ProductGrid;
