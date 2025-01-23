import dynamic from "next/dynamic";
const IntakePacket = dynamic(
	() => import("@/components/clinicviews/LLPMG/IntakePacket"),
	{
		ssr: false,
	}
);

export default function IntakePacketPage() {
	return <IntakePacket />;
}
