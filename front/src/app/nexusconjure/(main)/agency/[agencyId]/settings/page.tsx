// src/app/nexusconjure/(main)/agency/[agencyId]/settings/page.tsx

import React from "react";
import AgencyDetails from "@/components/nexusconjure/forms/agency-details";
import UserDetails from "@/components/nexusconjure/forms/user-details";
import { db } from "@/utils/nexusconjure/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route"; // Correct path for authOptions
// import { UserRole } from "@/types/nexusconjure/user"; // Ensure correct path
import Unauthorized from "@/components/nexusconjure/unauthorized"; // If needed
import { redirect } from "next/navigation"; // Ensure this import is present
import {
	getAuthUserDetails,
	verifyAndAcceptInvitation,
} from "@/utils/nexusconjure/queries";

type Props = {
	params: { agencyId: string };
};

const SettingsPage = async ({ params }: Props) => {
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
		return redirect("/nexusconjure/agency");
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

	// Optional: Further authorization based on roles
	if (user.role === "SUBACCOUNT_GUEST" || user.role === "SUBACCOUNT_USER") {
		return redirect("/nexusconjure/subaccount");
	}

	// Fetch team members associated with the agency
	const teamMembers = await db.user.findMany({
		where: {
			Agency: {
				id: params.agencyId,
			},
		},
		include: {
			Agency: { include: { subAccounts: true } },
			Permissions: { include: { SubAccount: true } },
		},
	});

	// Fetch agency details
	const agencyDetails = await db.agency.findUnique({
		where: {
			id: params.agencyId,
		},
		include: {
			subAccounts: true,
		},
	});

	if (!agencyDetails) {
		return <div>Agency not found.</div>;
	}

	const subAccounts = agencyDetails.subAccounts;

	return (
		<div className="flex lg:flex-row flex-col gap-4">
			<AgencyDetails data={agencyDetails} />
			<UserDetails
				type="agency"
				id={params.agencyId}
				subAccounts={subAccounts}
				userData={user}
			/>
		</div>
	);
};

export default SettingsPage;
