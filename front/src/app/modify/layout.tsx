// src/app/modify/ModifyLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
	VideoBoxesProvider,
	VideoSettingsProvider,
} from "@/components/modify/organisms";
import { ActiveVideoBoxProvider } from "@/components/modify/molecules";
import "@/styles/modify/globalStyles.css";
import "@/styles/globals.css";
import GlassModifyWrap from "@/store/change/modify/GlassModifyWrap";
import { FeatureDetectionGuard } from "../../components/modify/atoms/FeatureDetectionGuard/FeatureDetectionGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PortalJot Modify",
};

export default function ModifyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={""}>
				<main className="">
					<FeatureDetectionGuard>
						<VideoBoxesProvider>
							<VideoSettingsProvider>
								<ActiveVideoBoxProvider>
									{/* <GlassModifyWrap> */}
									{children}
									{/* </GlassModifyWrap> */}
								</ActiveVideoBoxProvider>
							</VideoSettingsProvider>
						</VideoBoxesProvider>
					</FeatureDetectionGuard>
				</main>
				<div id="glass-modal-root"></div>
			</body>
		</html>
	);
}
