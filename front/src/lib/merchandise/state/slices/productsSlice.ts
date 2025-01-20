import { ISyncProduct } from "@/pages/api/merchandise/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Products = { [id: string]: ISyncProduct };
export interface ProductsState {
    products: Products;
}

const initialState: ProductsState = {
    products: {},
};

const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        receivedProducts(state, action: PayloadAction<ISyncProduct[]>) {
            const products = action.payload;
            products.forEach((product) => {
                state.products[product.id] = product;
            });
        },
    },
});

export const { receivedProducts } = productsSlice.actions;
export default productsSlice.reducer;
