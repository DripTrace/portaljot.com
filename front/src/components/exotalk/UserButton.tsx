"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/store/exotalk/store";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";
import LoadingSpinner from "./loadingSpinner";

function UserButton({ session }: { session: Session | null }) {
	const subscription = useSubscriptionStore((state) => state.subscription);

	// Session ...
	if (!session)
		return (
			<Button className="" variant={"outline"} onClick={() => signIn()}>
				Sign In
			</Button>
		);
	return (
		session && (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar
						name={session.user?.name}
						image={session.user?.image}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
					<DropdownMenuSeparator />

					{subscription === undefined && (
						<DropdownMenuItem>
							<LoadingSpinner />
						</DropdownMenuItem>
					)}

					{/* {subscription?.role === "pro" && ( */}
					{subscription?.status === "active" && (
						<>
							<DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-{#E935C1] animate-pulse">
								<StarIcon fill="#E935C1" />
								<p>PRO</p>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<ManageAccountButton />
							</DropdownMenuItem>
						</>
					)}

					<DropdownMenuItem onClick={() => signOut()}>
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	);
}

export default UserButton;
