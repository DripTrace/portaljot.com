import StoryWriter from "@/components/imagine/StoryWriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Logo = "/imagine/images/logo.png";

export default function Home() {
	return (
		<div className="flex-1 flex flex-col">
			<section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
				<div className="bg-purple-500 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 pb-10">
					<Image
						src={Logo}
						alt="Logo"
						width={200}
						height={100}
						className="rounded-md"
					/>

					<Button
						asChild
						className="px-20 bg-purple-700 p-10 text-xl"
					>
						<Link href="/imagine/stories">
							Explore story library
						</Link>
					</Button>
				</div>
				{/* <Image src={Logo} alt="AI Storyteller" /> */}

				<StoryWriter />
			</section>
		</div>
	);
}
