"use client";

import { use } from "react";
import ContentComponent from "@/components/merchandise/ContentComponent";
import ProductGrid from "@/components/merchandise/ProductIntegration/ProductGrid";
import { fetchPrintfulProducts } from "@/actions/merchandise/fetchPrintfulProducts";

function Print() {
    const { products, error } = use(fetchPrintfulProducts());

    if (error) {
        return (
            <ContentComponent title="Error" description="An error occurred">
                <div>Error: {error}</div>
            </ContentComponent>
        );
    }

    return (
        <ContentComponent title="" description="">
            <ProductGrid products={products} />
        </ContentComponent>
    );
}

export default Print;
