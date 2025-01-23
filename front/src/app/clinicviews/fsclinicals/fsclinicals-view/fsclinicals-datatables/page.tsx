import FSClinicalsDashboardDatatables from "@/components/clinicviews/FSClinicals/FSClinicalsComponents/FSClinicalsDashboardDatatables";

export const dynamic = "auto";

export default function FSClinicalsDatatablesPage() {
	return (
		<div className="flex h-[100vh] w-full justify-center flex-col items-center">
			<FSClinicalsDashboardDatatables />
		</div>
	);
}
