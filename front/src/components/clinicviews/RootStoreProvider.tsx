"use client";

// import { DomainContextInitializer } from "@/app/DomainContextInitializer";
import { domainStore } from "@/store/domainStore";
import { useEffect } from "react";
import { Provider as DomainProvider } from "react-redux";
import NotificationExample from "./NotificationExample";
import SafeInstallPrompt from "./SafeInstallPrompt";
// import InstallPrompt from "./SafeInstallPrompt";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        console.log("(src/components/RootStoreProvider)\nstore provider");
    }, []);

    return (
        <DomainProvider store={domainStore}>
            {/* <DomainContextInitializer /> */}
            <NotificationExample />
            <SafeInstallPrompt />
            {children}
        </DomainProvider>
    );
}
