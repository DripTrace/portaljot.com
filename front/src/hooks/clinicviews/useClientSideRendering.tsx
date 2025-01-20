"use client";

import { useState, useEffect } from "react";

export const useClientSideRendering = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient;
};
