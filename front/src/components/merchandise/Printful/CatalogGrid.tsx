"use client";

import React from "react";
import Catalog from "./Catalog";
import { PrintfulProduct } from "@/types/merchandise/types";

interface CatalogGridProps {
    catalog: PrintfulProduct[];
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ catalog }) => {
    if (!catalog || catalog.length === 0) return null;

    return (
        <div className="grid gap-6 grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 justify-items-center">
            {catalog.map((product) => (
                <Catalog key={product.id} {...product} />
            ))}
        </div>
    );
};

export default CatalogGrid;
