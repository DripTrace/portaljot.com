import dynamic from "next/dynamic";
const FSClinicalsFormComponent = dynamic(
	() =>
		import(
			"@/components/clinicviews/FSClinicals/FSClinicalsComponents/FSClinicalsForm"
		),
	{ ssr: false }
);

export default function FSClinicalsForm() {
	return (
		<div className="flex size-full justify-center flex-col items-center scrollbar-hide">
			<FSClinicalsFormComponent />
		</div>
	);
}
