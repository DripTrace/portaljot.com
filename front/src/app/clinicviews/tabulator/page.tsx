import DashboardTabulator from "@/components/clinicviews/DashboardTabulator";

export const dynamic = "auto";

export default function SurveyTabulatorPage() {
	return (
		<div className="flex min-h-screen flex-col items-center p-8">
			<DashboardTabulator />
		</div>
	);
}
