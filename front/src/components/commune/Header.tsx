import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Avatar from "./Avatar";
import { Sidebar } from "lucide-react";

function Header() {
	return (
		<header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
			<Link
				href="/commune"
				className="text-4xl font-thin flex items-center"
			>
				<Avatar seed="PAPAFAM Support Agent" />
				<div className="flex flex-col gap-1">
					<h1>Assistly</h1>
					<h2 className="text-sm">Your Customisable AI Chat Agent</h2>
				</div>
			</Link>

			<div className="flex items-center ">
				<SignedIn>
					<UserButton showName />
				</SignedIn>

				<SignedOut>
					<SignInButton />
				</SignedOut>
			</div>
		</header>
	);
}

export default Header;
Sidebar;
