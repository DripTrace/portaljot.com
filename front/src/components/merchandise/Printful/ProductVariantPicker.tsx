"use client";

import React from "react";
import { PrintfulProductVariant } from "@/types/merchandise/types";

interface ProductVariantPickerProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    variant_count: PrintfulProductVariant[];
    disabled: boolean;
}

const ProductVariantPicker: React.FC<ProductVariantPickerProps> = ({
    variant_count,
    ...props
}) => {
    if (variant_count.length === 0 || variant_count.length === 1) return null;

    return (
        <select
            {...props}
            className="appearance-none w-full relative mb-3 sm:mb-0 flex-grow sm:mr-3 pl-3 py-2 bg-white border border-gray-300 focus:border-gray-500 shadow-sm text-gray-500 text-sm focus:outline-none focus:text-gray-900 rounded"
        >
            {variant_count.map(({ id, name }) => (
                <option key={id} value={id}>
                    {name}
                </option>
            ))}
        </select>
    );
};

export default ProductVariantPicker;
