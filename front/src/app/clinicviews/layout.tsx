import { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/globals.css";
import { getFavicon } from "@/utils/getFavicon";
import RootClientLayout from "@/components/RootClientLayout";
import InstallPrompt from "@/components/SafeInstallPrompt";
import NotificationExample from "@/components/NotificationExample";

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = cookies();
    const domainContext =
        cookieStore.get("domainContext")?.value || "driptrace";
    const favicon = getFavicon(domainContext);

    return {
        manifest: `/manifest_${domainContext}.webmanifest`,
        icons: {
            icon: [
                { url: favicon.icon, sizes: "any" },
                { url: favicon.apple, sizes: "180x180", type: "image/png" },
            ],
            apple: [
                { url: favicon.apple, sizes: "180x180", type: "image/png" },
            ],
            shortcut: [{ url: favicon.shortcut }],
        },
    };
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NotificationExample />
            <InstallPrompt />
            <RootClientLayout>{children}</RootClientLayout>
        </>
    );
}
