import dynamic from "next/dynamic";
const IntakePacket = dynamic(() => import("@/components/LLPMG/IntakePacket"), {
    ssr: false,
});

export default function IntakePacketPage() {
    return <IntakePacket />;
}
