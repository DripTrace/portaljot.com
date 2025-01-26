import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer } from "@/components/change/Footer";
import ChangeHome from "@/components/change/ChangeHome";

const inter = Inter({ subsets: ["latin"] });

export default function ChangePage() {
	return <ChangeHome />;
}
