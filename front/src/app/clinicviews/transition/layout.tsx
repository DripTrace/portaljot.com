// src/app/transition/layout.tsx
"use client";

import { TransitionLayout } from "@/components/effects/TransitionLayout";

export default function TransitionLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <TransitionLayout>{children}</TransitionLayout>;
}
