import dynamic from "next/dynamic";
const ReturningFSClinicalsFormComponent = dynamic(
    () =>
        import(
            "@/components/FSClinicals/FSClinicalsComponents/FSClinicalsReturningForm"
        ),
    { ssr: false }
);

export default function FSClinicalsForm() {
    return (
        <div className="flex size-full justify-center flex-col items-center scrollbar-hide">
            <ReturningFSClinicalsFormComponent />
        </div>
    );
}
