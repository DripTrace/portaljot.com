"use client";

import { type FC, type ReactNode, useRef } from "react";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
import GlassModal, { GlassModalHandle } from "./GlassModal";
import GlassAuthenticator from "./GlassAuthenticator";
import GlassHeader from "./GlassHeader";
// import Authorization from "./Authorization";
// import QuickSketch from "./QuickSketch";
// import SketchGlassModifyModal from "./SketchModal";
// import DesignMix from "@/components/merchandise/DesignMix";
// import Socials from "@/components/merchandise/Socials";

interface GlassProps {
	children: ReactNode;
}

const Glass: FC<GlassProps> = ({ children }) => {
	const glassModifyRef = useRef<HTMLDivElement>(null);
	// const glassModifyAuthModalRef = useRef<{ open: () => void; close: () => void }>(
	//     null
	// );
	const glassModifyAuthModalRef = useRef<GlassModalHandle>(null); // Ensure the ref type matches GlassModalHandle

	// const quickSketchModalRef = useRef<{
	//     openSketch: () => void;
	//     closeQuickSketchModal: () => void;
	// }>(null);

	const openGlassModifyModal = () => {
		glassModifyAuthModalRef.current?.openModal();
	};

	const closeGlassModifyModal = () => {
		glassModifyAuthModalRef.current?.close();
	};

	// const openSketch = () => {
	//     quickSketchModalRef.current?.openSketch();
	// };

	// const closeQuickSketch = () => {
	//     quickSketchModalRef.current?.closeQuickSketchModal();
	// };

	return (
		<main ref={glassModifyRef}>
			<GlassModal ref={glassModifyAuthModalRef}>
				<GlassAuthenticator
					closeGlassModifyModal={closeGlassModifyModal}
				/>
			</GlassModal>
			{/* <SketchGlassModifyModal ref={quickSketchModalRef}>
                <QuickSketch closeQuickSketch={closeQuickSketch} />
            </SketchModal> */}
			{/* <DesignMix key="design_mix" /> */}
			<div className="relative top-0 h-full w-full z-40 flex flex-col items-center justify-center text-center text-xs xs:text-sm mobile-l:text-base laptop-l:text-lg bg-[#171925]">
				<GlassHeader
					key="glass-modify-header"
					openGlassModifyModal={openGlassModifyModal}
					// openSketch={openSketch}
				/>
				{/* <Sidebar key="sidebar" />
                <Socials key="externals" /> */}
				{children}
				{/* <Footer key="footer" /> */}
			</div>
		</main>
	);
};

export default Glass;
