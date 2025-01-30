// src/components/nexusconjure/global/infobar.tsx

"use client";

import { NotificationWithUser } from "@/utils/nexusconjure/types";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
	notifications: NotificationWithUser[];
	role?: Role;
	className?: string;
	subAccountId?: string;
};

const InfoBar = ({ notifications, subAccountId, className, role }: Props) => {
	const { data: session, status } = useSession();
	const [allNotifications, setAllNotifications] =
		useState<NotificationWithUser[]>(notifications);
	const [showAll, setShowAll] = useState(true);

	const handleToggle = () => {
		if (!showAll) {
			setAllNotifications(notifications);
		} else {
			if (notifications.length !== 0 && subAccountId) {
				setAllNotifications(
					notifications.filter(
						(item) => item.subAccountId === subAccountId
					)
				);
			} else {
				setAllNotifications([]);
			}
		}
		setShowAll((prev) => !prev);
	};

	const handleSignOut = () => {
		signOut({ callbackUrl: "/nexusconjure/" });
	};

	if (status === "loading") {
		return null; // Optionally, render a loading spinner here
	}

	return (
		<>
			<div
				className={twMerge(
					"fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px]",
					className
				)}
			>
				<div className="flex items-center gap-2 ml-auto">
					{/* Custom User Menu */}
					{session?.user ? (
						<div className="relative">
							<button
								className="flex items-center focus:outline-none"
								onClick={() => setShowAll(!showAll)}
							>
								<Avatar>
									{session.user.image ? (
										<AvatarImage
											src={session.user.image}
											alt="User Avatar"
										/>
									) : (
										<AvatarFallback>
											{session.user.name
												? session.user.name
														.split(" ")
														.map((n) => n[0])
														.join("")
														.toUpperCase()
												: "U"}
										</AvatarFallback>
									)}
								</Avatar>
							</button>

							{/* Dropdown Menu */}
							{showAll && (
								<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-30">
									<div className="px-4 py-2 border-b dark:border-gray-700">
										<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
											{session.user.name}
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											{session.user.email}
										</p>
									</div>
									<button
										onClick={handleSignOut}
										className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<Link
							href="/nexusconjure/agency"
							className="navigation-login-button px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
						>
							Login
						</Link>
					)}

					{/* Notification Bell */}
					<Sheet>
						<SheetTrigger>
							<div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white cursor-pointer">
								<Bell size={17} />
							</div>
						</SheetTrigger>
						<SheetContent className="mt-4 mr-4 pr-4 overflow-scroll max-h-[80vh]">
							<SheetHeader className="text-left">
								<SheetTitle>Notifications</SheetTitle>
								{(role === "AGENCY_ADMIN" ||
									role === "AGENCY_OWNER") && (
									<SheetDescription>
										<Card className="flex items-center justify-between p-4 mt-2">
											<span>Current Subaccount</span>
											<Switch
												checked={showAll}
												onCheckedChange={handleToggle}
												aria-label="Toggle Subaccount Notifications"
											/>
										</Card>
									</SheetDescription>
								)}
							</SheetHeader>
							{allNotifications.length > 0 ? (
								allNotifications.map((notification) => (
									<div
										key={notification.id}
										className="flex flex-col gap-y-2 mb-2 overflow-x-scroll text-ellipsis"
									>
										<div className="flex gap-2">
											<Avatar>
												{notification.User.avatarUrl ? (
													<AvatarImage
														src={
															notification.User
																.avatarUrl
														}
														alt="Profile Picture"
													/>
												) : (
													<AvatarFallback className="bg-primary">
														{notification.User.name
															? notification.User.name
																	.split(" ")
																	.map(
																		(n) =>
																			n[0]
																	)
																	.join("")
																	.toUpperCase()
															: "U"}
													</AvatarFallback>
												)}
											</Avatar>
											<div className="flex flex-col">
												<p>
													<span className="font-bold">
														{
															notification.notification.split(
																"|"
															)[0]
														}
													</span>
													<span className="text-muted-foreground">
														{
															notification.notification.split(
																"|"
															)[1]
														}
													</span>
													<span className="font-bold">
														{
															notification.notification.split(
																"|"
															)[2]
														}
													</span>
												</p>
												<small className="text-xs text-muted-foreground">
													{new Date(
														notification.createdAt
													).toLocaleDateString()}
												</small>
											</div>
										</div>
									</div>
								))
							) : (
								<div
									className="flex items-center justify-center text-muted-foreground"
									style={{ marginBottom: "1rem" }}
								>
									You have no notifications
								</div>
							)}
						</SheetContent>
					</Sheet>

					{/* Mode Toggle */}
					<ModeToggle />
				</div>
			</div>
		</>
	);
};

export default InfoBar;
