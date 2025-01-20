"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

// Define types for the product and context
interface Product {
    _id: string;
    name: string;
    price: number;
    quantity?: number;
}

interface ContextProps {
    showCart: boolean;
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: Product[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: Product, quantity: number) => void;
    toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
    onRemove: (product: Product) => void;
    setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with proper types
const Context = createContext<ContextProps | undefined>(undefined);

interface StateContextProps {
    children: ReactNode;
}

export const StateContext = ({ children }: StateContextProps) => {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState<number>(0);
    const [qty, setQty] = useState<number>(1);

    const onAdd = (product: Product, quantity: number) => {
        const checkProductInCart = cartItems.find(
            (item) => item._id === product._id
        );

        setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: (cartProduct.quantity || 0) + quantity,
                    };
                }
                return cartProduct;
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const onRemove = (product: Product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        if (!foundProduct) return;

        const newCartItems = cartItems.filter(
            (item) => item._id !== product._id
        );

        setTotalPrice(
            (prevTotalPrice) =>
                prevTotalPrice -
                foundProduct.price * (foundProduct.quantity || 0)
        );
        setTotalQuantities(
            (prevTotalQuantities) =>
                prevTotalQuantities - (foundProduct.quantity || 0)
        );
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
        const foundProduct = cartItems.find((item) => item._id === id);
        if (!foundProduct) return;

        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === "inc") {
            setCartItems([
                ...newCartItems,
                { ...foundProduct, quantity: (foundProduct.quantity || 0) + 1 },
            ]);
            setTotalPrice(
                (prevTotalPrice) => prevTotalPrice + foundProduct.price
            );
            setTotalQuantities(
                (prevTotalQuantities) => prevTotalQuantities + 1
            );
        } else if (
            value === "dec" &&
            foundProduct.quantity &&
            foundProduct.quantity > 1
        ) {
            setCartItems([
                ...newCartItems,
                { ...foundProduct, quantity: foundProduct.quantity - 1 },
            ]);
            setTotalPrice(
                (prevTotalPrice) => prevTotalPrice - foundProduct.price
            );
            setTotalQuantities(
                (prevTotalQuantities) => prevTotalQuantities - 1
            );
        }
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = (): ContextProps => {
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "useStateContext must be used within a StateContextProvider"
        );
    }
    return context;
};
