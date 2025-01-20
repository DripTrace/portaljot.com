// app/some-component.tsx
"use client";

import { useDomainSelector } from "@/store/domainHooks";
import { useEffect, useState } from "react";

export default function SomeComponent() {
    const reduxDomainContext = useDomainSelector(
        (state) => state.app.domainContext
    );
    const [domainContext, setDomainContext] = useState("unknown");

    useEffect(() => {
        setDomainContext(reduxDomainContext);
    }, [reduxDomainContext]);

    return (
        <>
            <h1>Some Component</h1>
            <p>Domain Context: {domainContext}</p>
        </>
    );
}
