import React from "react";
import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
	title: "LLPMG",
	description: "Loma Linda Psychiatric Medical Group",
};

export default function LLPMGRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ClientLayout>{children}</ClientLayout>;
}
