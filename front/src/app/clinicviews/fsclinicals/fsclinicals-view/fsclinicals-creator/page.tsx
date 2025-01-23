import FSClinicalsFormCreatorComponent from "@/components/clinicviews/FSClinicals/FSClinicalsComponents/FSClinicalsFormCreator";

import dynamic from "next/dynamic";
const IntakePacket = dynamic(
	() =>
		import(
			"@/components/clinicviews/FSClinicals/FSClinicalsComponents/FSClinicalsFormCreator"
		),
	{
		ssr: false,
	}
);

export default function FSClinicalsFormCreator() {
	return (
		<div className="flex h-[100vh] w-full justify-center flex-col items-center">
			<FSClinicalsFormCreatorComponent />
		</div>
	);
}
