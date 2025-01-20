import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BasketItem {
    id: string;
    price: number;
    url: string;
    description: string;
    image: string;
    name: string;
}

interface BasketState {
    items: BasketItem[];
    multiples: any[]; // Consider defining a more specific type
    count: number;
    cart: {
        basketItems: {
            items: BasketItem[];
            count: number;
        };
    };
}

const initialState: BasketState = {
    items: [],
    multiples: [],
    count: 1,
    cart: {
        basketItems: {
            items: [],
            count: 0,
        },
    },
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<BasketItem>) => {
            state.items.push(action.payload);
        },
        removeFromBasket: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );

            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove the product (id: ${action.payload.id}) as it's not in the basket.`
                );
            }
        },
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: { basket: BasketState }) =>
    state.basket.items;
export const selectBasket = (state: { basket: BasketState }) =>
    state.basket.cart;
export const selectMultiples = (state: { basket: BasketState }) =>
    state.basket.multiples;

export const selectTotal = (state: { basket: BasketState }) =>
    state.basket.items.reduce(
        (total: number, item: BasketItem) => total + Number(item.price),
        0
    );

export default basketSlice.reducer;
