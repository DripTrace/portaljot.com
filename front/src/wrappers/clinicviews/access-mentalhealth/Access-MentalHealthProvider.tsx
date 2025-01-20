"use client";

import { anAMHStore } from "@/store/access-mentalhealth/anAMHStore";
import { Provider } from "react-redux";

export function AMHProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={anAMHStore}>{children}</Provider>;
}
