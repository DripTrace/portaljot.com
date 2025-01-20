import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export interface VariantProduct {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
}

export interface VariantFiles {
    id: number;
    type: string;
    hash: string | null;
    url: string | null;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
}

export interface VariantOptions {
    id: string;
    value: [string];
}

export interface ISyncVariant {
    name: string;
    id: number;
    sync_product_id: number;
    synced: boolean;
    variant_id: number;
    warehouse_product_variant_id: number | null;
    retail_price: string;
    sku: string;
    currency: string;
    product: VariantProduct;
    files: [VariantFiles];
    options: [VariantOptions];
    is_ignored: boolean;
}

export type Variants = { [id: string]: ISyncVariant };

export interface VariantState {
    variants: Variants;
}

const initialState: VariantState = {
    variants: {},
};

const variantsSlice = createSlice({
    initialState,
    name: "variants",
    reducers: {
        displayVariants(state, action: PayloadAction<ISyncVariant[]>) {
            const variants = action.payload;
            variants.forEach((variant) => {
                state.variants[variant.id] = variant;
            });
        },
    },
});

export function getFirstVariant(state: RootState) {
    console.log("retrieving first variant");
    let firstVariant = state.variant.variants[0];
    return firstVariant;
}

export const getMemoizedFirstVariant = createSelector(
    (state: RootState) => state.variant.variants,
    (variants) => {
        console.log("calling getMemoizedFirstVartant");
        let firstVariant = variants[0];
        return firstVariant;
    }
);

export const { displayVariants } = variantsSlice.actions;
export default variantsSlice.reducer;
