"use client";

import { Suspense } from "react";
import ContentComponent from "./ContentComponent";
import { PrintfulProduct } from "@/types/merchandise/types";
import dynamic from "next/dynamic";

const ProductsServerLoader = dynamic(() => import("./ProductsServerLoader"), {
    ssr: false,
    loading: () => <div>Loading products...</div>,
});

interface MerchandiseProps {
    products: PrintfulProduct[];
}

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will find a plethora of custom graphic designs attached to high-quality merchandise.";

const Merchandise: React.FC<MerchandiseProps> = ({ products }) => {
    return (
        <ContentComponent title="Home" description={`${title} - ${subtitle}`}>
            <Suspense fallback={<div>Loading products...</div>}>
                <ProductsServerLoader />
            </Suspense>
        </ContentComponent>
    );
};

export default Merchandise;
