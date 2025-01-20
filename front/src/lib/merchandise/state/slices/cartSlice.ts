import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

type CheckoutState = "LOADING" | "READY" | "ERROR";
export interface CartState {
    items: { [productID: string]: number };
    checkoutState: CheckoutState;
    errorMessage: string;
}

const initialState: CartState = {
    items: {},
    checkoutState: "READY",
    errorMessage: "",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<string>) {
            if (state.items[action.payload]) {
                state.items[action.payload]++;
            } else {
                state.items[action.payload] = 1;
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            delete state.items[action.payload];
        },
        updateQuantity(
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) {
            const { id, quantity } = action.payload;
            state.items[id] = quantity;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState) {
    console.log("calling numItems");
    let numItems = 0;
    for (let id in state.cart.items) {
        numItems += state.cart.items[id];
    }
    return numItems;
}

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        console.log("calling getMemoizedNumItems");
        let numItems = 0;
        for (let id in items) {
            numItems += items[id];
        }
        return numItems;
    }
);

export const getTotalPrice = createSelector(
    (state: RootState) => state.cart.items,
    (state: RootState) => state.products.products,
    (items, products) => {
        let total = 0;
        for (let id in items) {
            total += Number(products[id].variants.retail_price) * items[id];
        }
        return total.toFixed(2);
    }
);
