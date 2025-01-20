"use client";

import React, { useState } from "react";
import Sip from "@/components/LLPMG/sip/Sip";
import SipErrorBoundary from "@/components/LLPMG/sip/SipErrorBoundary";

export const dynamic = "auto";

const SipAutoPage = () => {
    const [callActive, setCallActive] = useState(false);

    const handleCallStateChange = (isActive: boolean) => {
        setCallActive(isActive);
    };

    return (
        <SipErrorBoundary>
            <Sip onCallStateChange={handleCallStateChange} />
        </SipErrorBoundary>
    );
};

export default SipAutoPage;
