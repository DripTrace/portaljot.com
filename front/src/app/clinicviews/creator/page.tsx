import SurveyCreatorComponent from "@/components/clinicviews/SurveyCreator";

export const dynamic = "auto";

export default function SurveyCreator() {
	return (
		<div className="flex h-[100vh] w-full justify-center flex-col items-center">
			<SurveyCreatorComponent />
		</div>
	);
}
