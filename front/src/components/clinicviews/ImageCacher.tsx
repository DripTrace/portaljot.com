// components/ImageCacher.tsx

import { useDomainSelector } from "@/store/domainHooks";
import { useEffect } from "react";

export function ImageCacher() {
    const domainContext = useDomainSelector((state) => state.app.domainContext);

    useEffect(() => {
        if ("serviceWorker" in navigator && domainContext) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.active?.postMessage({
                    action: "cache-on-demand",
                    domain: domainContext,
                });
            });
        }
    }, [domainContext]);

    return null; // This component doesn't render anything
}

// Use this component in your layout or pages where you want to trigger the caching
