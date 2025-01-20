"use client";

import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
    addToBasket,
    removeFromBasket,
    selectItems,
    selectMultiples,
} from "@/lib/merchandise/state/slices/basketSlice";
import { useSession } from "next-auth/react";

export default function CheckoutProduct({
    id,
    price,
    url,
    description,
    image,
    name,
}: any) {
    const dispatch = useDispatch();
    const { data: session, status } = useSession(); // Access session if needed

    const product = {
        id,
        price,
        url,
        description,
        image,
        name,
    };

    const addItemToBasket = () => {
        console.log({ checkout_product: product });
        dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
    };

    const items = useSelector(selectItems);
    const multiples = useSelector(selectMultiples);

    return (
        <div className="relative h-full w-full grid vs:grid-cols-1 tablet:grid-cols-5 grid-cols-5">
            <div className="h-full w-full flex items-center justify-center">
                <Image
                    alt=""
                    src={image}
                    height={250}
                    width={250}
                    className="h-full w-full border border-transparent rounded-[0.625em]"
                />
            </div>

            <div className="col-span-3 mx-5 self-center">
                <p>{name}</p>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={Number(price)} />
            </div>

            <div className="flex space-x-2 my-auto justify-center items-center">
                <button
                    className="checkout-input flex items-center justify-center"
                    onClick={removeItemFromBasket}
                >
                    -
                </button>
                <div className="flex items-center justify-center h-full w-full">
                    {items.length}
                </div>
                <button
                    className="checkout-input flex items-center justify-center"
                    onClick={addItemToBasket}
                >
                    +
                </button>
            </div>
        </div>
    );
}
