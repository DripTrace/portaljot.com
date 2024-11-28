// import "./globalStyles.css";

// import { FeatureDetectionGuard } from "./components/atoms";
// import { ActiveVideoBoxProvider } from "./components/molecules";
// import {
//   VideoBoxesProvider,
//   VideoSettingsProvider,
// } from "./components/organisms";
// import { VideoEditor } from "./VideoEditor";

// function App() {
//   return (
//     <FeatureDetectionGuard>
//       <VideoBoxesProvider>
//         <VideoSettingsProvider>
//           <ActiveVideoBoxProvider>
//             <VideoEditor />
//           </ActiveVideoBoxProvider>
//         </VideoSettingsProvider>
//       </VideoBoxesProvider>
//     </FeatureDetectionGuard>
//   );
// }

// export default App;

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { FeatureDetectionGuard } from "@/components/modify/atoms";
// import {
// 	VideoBoxesProvider,
// 	VideoSettingsProvider,
// } from "@/components/modify/organisms";
// import { ActiveVideoBoxProvider } from "@/components/modify/molecules";
// import "@/styles/modify/globalStyles.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "PortalJot Modify",
// };

// export default function ModifyLayout({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<html lang="en">
// 			<body className={""}>
// 				<main className="">
// 					<FeatureDetectionGuard>
// 						<VideoBoxesProvider>
// 							<VideoSettingsProvider>
// 								<ActiveVideoBoxProvider>
// 									{children}
// 								</ActiveVideoBoxProvider>
// 							</VideoSettingsProvider>
// 						</VideoBoxesProvider>
// 					</FeatureDetectionGuard>
// 				</main>
// 			</body>
// 		</html>
// 	);
// }

// src/app/modify/ModifyLayout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FeatureDetectionGuard } from "@/components/modify/atoms";
import {
	VideoBoxesProvider,
	VideoSettingsProvider,
} from "@/components/modify/organisms";
import { ActiveVideoBoxProvider } from "@/components/modify/molecules";
import "@/styles/modify/globalStyles.css";
import "@/styles/modify/modifyStyles.css";
import GlassModifyWrap from "@/store/change/modify/GlassModifyWrap";

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
			{/* <GlassModifyWrap> */}
			<body className={""}>
				<main className="">
					<FeatureDetectionGuard>
						<VideoBoxesProvider>
							<VideoSettingsProvider>
								<ActiveVideoBoxProvider>
									<GlassModifyWrap>
										{children}
									</GlassModifyWrap>
								</ActiveVideoBoxProvider>
							</VideoSettingsProvider>
						</VideoBoxesProvider>
					</FeatureDetectionGuard>
				</main>
				<div id="glass-modal-root"></div>
			</body>
			{/* </GlassModifyWrap> */}
		</html>
	);
}
