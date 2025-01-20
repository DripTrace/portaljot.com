"use client";

import { store } from "@/store/store";
import { Provider as LLPMGProvider } from "react-redux";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <LLPMGProvider store={store}>{children}</LLPMGProvider>;
}
