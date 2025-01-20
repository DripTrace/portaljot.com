import SurveyCreatorComponent from "@/components/SurveyCreator";
// import dynamic from "next/dynamic";

export const dynamic = "auto";

// const IntakePacket = dynamic(() => import("@/components/SurveyCreator"), {
//     ssr: false,
// });

export default function SurveyCreator() {
    return (
        <div className="flex h-[100vh] w-full justify-center flex-col items-center">
            <SurveyCreatorComponent />
        </div>
    );
}
