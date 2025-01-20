import dynamic from "next/dynamic";

const AdvancedPractice = dynamic(
    () => import("@/components/AdvancedPracticePsych/AdvancedPractice"),
    { ssr: false }
);

export default function Home() {
    return <AdvancedPractice />;
}
