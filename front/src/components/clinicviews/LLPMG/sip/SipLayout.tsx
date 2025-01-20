import { Metadata } from "next";
import SipClientLayout from "./SipClientLayout";
// import SipClientLayout from "./SipClientLayout";

export const metadata: Metadata = {
    title: "LLPMG",
    description: "Loma Linda Psychiatric Medical Group",
};

export default function LLPMGSipRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SipClientLayout>{children}</SipClientLayout>;
}
