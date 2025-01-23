import { Suspense } from "react";
import dynamic from "next/dynamic";

const MainContent = dynamic(
	() => import("@/components/clinicviews/AdvancedPracticePsych/MainContent"),
	{ ssr: false }
);

const AdvancedPracticePsychPage = () => {
	return (
		<Suspense fallback={<div>Loading . . .</div>}>
			<MainContent />
		</Suspense>
	);
};

export default AdvancedPracticePsychPage;
