// src/app/nexusconjure/(main)/subaccount/[subaccountId]/layout.tsx

import React from "react";
import InfoBar from "@/components/nexusconjure/global/infobar";
import Sidebar from "@/components/nexusconjure/sidebar";
import Unauthorized from "@/components/nexusconjure/unauthorized";
import {
	getAuthUserDetails,
	getNotificationAndUser,
	verifyAndAcceptInvitation,
} from "@/utils/nexusconjure/queries";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route"; // Correct path for authOptions
import { Role } from "@prisma/client"; // Assuming Role is an enum in Prisma
import { redirect } from "next/navigation"; // Ensure this import is present
import { UserRole } from "@/types/user"; // Ensure correct path

type Props = {
	children: React.ReactNode;
	params: { subaccountId: string };
};

const SubaccountLayout = async ({ children, params }: Props) => {
	// Retrieve the session using NextAuth
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Redirect to sign-in page if not authenticated
		return redirect("/auth/signin");
	}

	// Get the user's email from the session
	const userEmail = session.user.email;

	if (!userEmail) {
		// Handle case where email is not available in session
		return <div>User email not found.</div>;
	}

	// Get the user's details based on email
	const user = await getAuthUserDetails(userEmail); // Ensure this function accepts email

	if (!user) {
		// Handle case where user details are not found in the database
		return <div>User details not found.</div>;
	}

	// Verify and accept the invitation to get agencyId
	const agencyId = await verifyAndAcceptInvitation();

	if (!agencyId) {
		return <Unauthorized />; // Or redirect to a relevant page
	}

	// Check if the user's role is authorized
	if (
		user.role !== "AGENCY_OWNER" &&
		user.role !== "AGENCY_ADMIN" &&
		user.role !== "SUBACCOUNT_GUEST" &&
		user.role !== "SUBACCOUNT_USER"
	) {
		return <Unauthorized />;
	}

	// Fetch team members associated with the agency
	const teamMembers = await db.user.findMany({
		where: {
			Agency: {
				id: params.subaccountId,
			},
		},
		include: {
			Agency: { include: { SubAccount: true } },
			Permissions: { include: { SubAccount: true } },
		},
	});

	// Fetch notifications
	let notifications: any = [];

	if (!user.role) {
		return <Unauthorized />;
	} else {
		// Fetch all permissions for the user
		const allPermissions = await getAuthUserDetails(userEmail); // Ensure this function fetches permissions

		const hasPermission = allPermissions?.Permissions.find(
			(permission) =>
				permission.access &&
				permission.subAccountId === params.subaccountId
		);

		if (!hasPermission) {
			return <Unauthorized />;
		}

		const allNotifications = await getNotificationAndUser(agencyId);

		if (user.role === "AGENCY_ADMIN" || user.role === "AGENCY_OWNER") {
			notifications = allNotifications;
		} else {
			const filteredNoti = allNotifications?.filter(
				(item: any) => item.subAccountId === params.subaccountId
			);
			if (filteredNoti) notifications = filteredNoti;
		}
	}

	return (
		<div className="h-screen overflow-hidden">
			<Sidebar id={params.subaccountId} type="subaccount" />

			<div className="md:pl-[300px]">
				<InfoBar
					notifications={notifications}
					role={user.role as Role}
					subAccountId={params.subaccountId}
				/>
				<div className="relative">{children}</div>
			</div>
		</div>
	);
};

export default SubaccountLayout;
