// import TheComponent from "@/components/TheComponent";

// const ThePage = () => {
// 	return <TheComponent />;
// };

// export default ThePage;

// page.tsx
"use client";

import dynamic from "next/dynamic";

const TheComponent = dynamic(() => import("@/components/base/TheComponent"), {
	ssr: false,
});

const ThePage = () => {
	return <TheComponent />;
};

export default ThePage;
