import { FSClinicalsFooter, FSClinicalsHeader } from "@/components";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import FSClinicalsClientRoot from "@/components/FSClinicals/FSClinicalsClientRoot";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FSClinicals",
    description: "Four Square Clinicals",
};

export default function FSClinicalsRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-[#D1E0EB] text-[#494949] /*bg-fsc-pale-blue text-fsc-dark-gray*/ scrollbar-hide pointer-events-auto relative min-h-[100vh]`}
            >
                <FSClinicalsClientRoot>
                    <div className="flex flex-col h-full relative">
                        <FSClinicalsHeader />
                        <main className="size-full relative">{children}</main>
                        <FSClinicalsFooter />
                    </div>
                </FSClinicalsClientRoot>
            </body>
        </html>
    );
}
