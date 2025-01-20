"use client";

import React from "react";

type OrdersProps = {
    id: string;
    amount: number;
    amountShipping: number;
    items: any[];
    timestamp: number;
    images: string[];
};

const Orders: React.FC<OrdersProps> = ({
    id,
    amount,
    amountShipping,
    items,
    timestamp,
    images,
}) => {
    return (
        <div>
            <h2>Order ID: {id}</h2>
        </div>
    );
};

export default Orders;
