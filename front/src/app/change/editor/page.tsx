"use client";

import dynamic from "next/dynamic";

const FabricCanvas = dynamic(
	() => import("@/components/change/EditorWithStore"),
	{ ssr: false }
);

function Editor() {
	return (
		// <div>
		<FabricCanvas />
		// </div>
	);
}

export default Editor;
