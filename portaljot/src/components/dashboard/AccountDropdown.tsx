"use client";

import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "./authProvider";
import { useRouter } from "next/navigation";

interface AccountDropdownProps {
	className?: string;
}
export default function AccountDropdown({ className }: AccountDropdownProps) {
	const auth = useAuth();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					size="icon"
					className="rounded-full"
				>
					<CircleUser className="h-5 w-5" />
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					{auth.username ? auth.username : "Account"}
				</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={(e) => router.push("/dashboard/logout")}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
