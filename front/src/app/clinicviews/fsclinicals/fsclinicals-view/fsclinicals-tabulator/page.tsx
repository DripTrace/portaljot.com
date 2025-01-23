import FSClinicalsDashboardTabulator from "@/components/clinicviews/FSClinicals/FSClinicalsComponents/FSClinicalsDashboardTabulator";

export const dynamic = "auto";

export default function FSClinicalsTabulatorPage() {
	return (
		<div className="flex size-full flex-col items-center">
			<FSClinicalsDashboardTabulator />
		</div>
	);
}
