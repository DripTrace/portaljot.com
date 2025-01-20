// src/lib/merchandise/context/WishlistProvider.tsx
"use client";

import React, { createContext, useReducer, useContext, useEffect } from "react";
import useLocalStorage from "@/hooks/merchandise/useLocalStorage";
import { PrintfulProduct } from "@/types/merchandise/types";

interface WishlistState {
    items: PrintfulProduct[];
    isSaved: (id: string) => boolean;
    hasItems: boolean;
}

interface WishlistDispatch {
    addItem: (item: PrintfulProduct) => void;
    removeItem: (id: string) => void;
}

export const WishlistStateContext = createContext<WishlistState | undefined>(
    undefined
);
export const WishlistDispatchContext = createContext<
    WishlistDispatch | undefined
>(undefined);

const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

type Actions =
    | { type: typeof ADD_PRODUCT; payload: PrintfulProduct }
    | { type: typeof REMOVE_PRODUCT; payload: string };

const initialState: WishlistState = {
    items: [],
    isSaved: () => false,
    hasItems: false,
};

function wishlistReducer(state: WishlistState, action: Actions): WishlistState {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                items: [...state.items, action.payload],
                hasItems: true,
            };
        case REMOVE_PRODUCT:
            const updatedItems = state.items.filter(
                (item) => item.id !== action.payload
            );
            return {
                ...state,
                items: updatedItems,
                hasItems: updatedItems.length > 0,
            };
        default:
            throw new Error(
                `Unhandled action type: ${(action as Actions).type}`
            );
    }
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [savedWishlist, saveWishlist] = useLocalStorage(
        "items-wishlist",
        JSON.stringify(initialState)
    );
    const [state, dispatch] = useReducer(
        wishlistReducer,
        JSON.parse(savedWishlist)
    );

    useEffect(() => {
        saveWishlist(JSON.stringify(state));
    }, [state, saveWishlist]);

    const addItem = (item: PrintfulProduct) => {
        if (!item.id) return;
        const existing = state.items.find((i) => i.id === item.id);
        if (existing)
            return dispatch({ type: REMOVE_PRODUCT, payload: item.id });
        dispatch({ type: ADD_PRODUCT, payload: item });
    };

    const removeItem = (id: string) => {
        if (!id) return;
        dispatch({ type: REMOVE_PRODUCT, payload: id });
    };

    const isSaved = (id: string) => state.items.some((i) => i.id === id);
    const hasItems = state.items.length > 0;

    return (
        <WishlistDispatchContext.Provider value={{ addItem, removeItem }}>
            <WishlistStateContext.Provider
                value={{ ...state, isSaved, hasItems }}
            >
                {children}
            </WishlistStateContext.Provider>
        </WishlistDispatchContext.Provider>
    );
};

// Export hooks to use the Wishlist Context
export const useWishlistState = (): WishlistState => {
    const context = useContext(WishlistStateContext);
    if (!context) {
        throw new Error(
            "useWishlistState must be used within a WishlistProvider"
        );
    }
    return context;
};

export const useWishlistDispatch = (): WishlistDispatch => {
    const context = useContext(WishlistDispatchContext);
    if (!context) {
        throw new Error(
            "useWishlistDispatch must be used within a WishlistProvider"
        );
    }
    return context;
};
