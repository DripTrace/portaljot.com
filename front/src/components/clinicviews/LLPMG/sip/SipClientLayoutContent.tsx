"use client";

import { useEffect, useState } from "react";
import { ConvoRootState } from "@/lib/llpmg/redux/stores/convoStore";
import { useConvoAppSelector } from "@/hooks/llpmg/sip/useConvoRedux";

interface SipClientLayoutContentProps {
    children: React.ReactNode;
}

const SipClientLayoutContent: React.FC<SipClientLayoutContentProps> = ({
    children,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const convo = useConvoAppSelector((state: ConvoRootState) => state.convo);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            className={`flex flex-col min-h-screen ${
                isLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
        >
            {children}
        </div>
    );
};

export default SipClientLayoutContent;
