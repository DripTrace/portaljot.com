"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SipErrorBoundary from "@/components/clinicviews/LLPMG/sip/SipErrorBoundary";

const DynamicSipContent = dynamic(
	() => import("@/components/clinicviews/LLPMG/sip/SipContent"),
	{
		ssr: false,
	}
);

const SipPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DynamicSipContent />
		</Suspense>
	);
};

export default SipPage;
