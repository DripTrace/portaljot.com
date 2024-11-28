"use client";

import Editor from "@/components/change/Editor";
import { ReactSwipeable } from "@/components/change/testSwipeable/ReactSwipeable";
import { StoreContext } from "@/store/change";
import { Store } from "@/store/change/Store";
import { Suspense, useEffect, useState } from "react";

const EditorWithStore = () => {
	const [store] = useState(new Store());
	const [isMobile, setIsMobile] = useState(false);
	const [showSwipeable, setShowSwipeable] = useState(false); // Initialize to false initially

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		// Update showSwipeable based on isMobile
		setShowSwipeable(isMobile);
	}, [isMobile]); // Re-run this effect whenever isMobile changes

	useEffect(() => {
		console.log(store);
	}, [store]);

	return (
		<StoreContext.Provider value={store}>
			<Suspense fallback={<h2>🌀 Loading...</h2>}>
				{isMobile && showSwipeable ? (
					<div className="h-screen flex justify-center items-center">
						<ReactSwipeable />
					</div>
				) : (
					<Editor />
				)}
			</Suspense>
		</StoreContext.Provider>
	);
};
export default EditorWithStore;
