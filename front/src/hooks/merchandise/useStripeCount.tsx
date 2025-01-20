"use client";

import { useReducer, useEffect } from "react";
import hasStripe from "@/lib/merchandise/has-stripe";

// Define the types for the cart items and state
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    cart: {
        items: {
            count: number;
            items: CartItem[];
        };
    };
}

// Define the possible actions for the reducer
type Action =
    | { type: "SET"; payload: Partial<CartState> }
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: string };

// Define the initial state
const initialState: CartState = {
    cart: {
        items: {
            count: 0,
            items: [],
        },
    },
};

// The reducer function that handles the defined actions
const reducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                ...action.payload,
            };
        case "ADD_ITEM":
            return {
                ...state,
                cart: {
                    items: {
                        count: state.cart.items.count + 1,
                        items: [...state.cart.items.items, action.payload],
                    },
                },
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                cart: {
                    items: {
                        count: state.cart.items.count - 1,
                        items: state.cart.items.items.filter(
                            (item) => item.id !== action.payload
                        ),
                    },
                },
            };
        default:
            // Throw an error if the action type is not handled
            throw new Error(`Unhandled action type: ${action}`);
    }
};

// Custom hook that utilizes the reducer
const useStripeCount = (): CartState => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (hasStripe()) {
            // Example: Load cart data when Stripe is available
            const cartData = {
                cart: {
                    items: {
                        count: 2,
                        items: [
                            { id: "1", name: "Item 1", price: 10, quantity: 1 },
                            { id: "2", name: "Item 2", price: 20, quantity: 1 },
                        ],
                    },
                },
            };
            dispatch({ type: "SET", payload: cartData });
        }
    }, []);

    return state;
};

export default useStripeCount;
