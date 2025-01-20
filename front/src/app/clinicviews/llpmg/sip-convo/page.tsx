import { Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicSipConvoContent = dynamic(
    () => import("@/components/LLPMG/sip/SipConvoContent"),
    {
        ssr: false,
    }
);

const SipConvoPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DynamicSipConvoContent />
        </Suspense>
    );
};

export default SipConvoPage;
