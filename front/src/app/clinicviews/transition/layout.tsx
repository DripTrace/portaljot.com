// src/app/transition/layout.tsx
"use client";

import { TransitionLayout } from "@/components/clinicviews/effects/TransitionLayout";

export default function TransitionLayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <TransitionLayout>{children}</TransitionLayout>;
}
