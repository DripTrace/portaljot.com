// src/components/layout.tsx
"use client";

import { ReactNode } from "react";
import ArcMenu from "./ArcMenu";
// import { ArcMenu } from "./arc-menu";

export default function ArcLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-100">
			<ArcMenu />
			<main className="p-8">{children}</main>
		</div>
	);
}
