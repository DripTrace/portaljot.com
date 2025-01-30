// src/app/nexusconjure/(main)/subaccount/[subaccountId]/settings/page.tsx

import React from "react";
import SubAccountDetails from "@/components/nexusconjure/forms/subaccount-details";
import UserDetails from "@/components/nexusconjure/forms/user-details";
import BlurPage from "@/components/nexusconjure/global/blur-page";
import { db } from "@/utils/nexusconjure/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route"; // Correct path for authOptions
import Unauthorized from "@/components/nexusconjure/unauthorized"; // If needed
import { redirect } from "next/navigation"; // Ensure this import is present
import {
	getAuthUserDetails,
	verifyAndAcceptInvitation,
} from "@/utils/nexusconjure/queries";
import { Role, SubAccount } from "@prisma/client"; // Ensure Role is imported
import { NotificationWithUser } from "@/utils/nexusconjure/types"; // Adjust the import path accordingly

type Props = {
	params: { subaccountId: string };
};

const SubaccountSettingPage = async ({ params }: Props) => {
	try {
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

		// Fetch subAccount based on subaccountId
		const subAccount = await db.subAccount.findUnique({
			where: { id: params.subaccountId },
		});

		if (!subAccount) {
			return <div>Subaccount not found.</div>;
		}

		if (!subAccount.agencyId) {
			return <div>Agency ID not found.</div>;
		}

		// Fetch agency details with the correct relation name
		const agencyDetails = await db.agency.findUnique({
			where: { id: subAccount.agencyId },
			include: { subAccounts: true }, // Corrected from 'SubAccount' to 'subAccounts'
		});

		if (!agencyDetails) {
			return <div>Agency not found.</div>;
		}

		const subAccounts = agencyDetails.subAccounts; // TypeScript recognizes subAccounts

		return (
			<BlurPage>
				<div className="flex lg:flex-row flex-col gap-4">
					<SubAccountDetails
						agencyDetails={agencyDetails}
						details={subAccount}
						userId={user.id}
						userName={user.name ?? "User"} // Provided default value to handle null
					/>
					<UserDetails
						type="subaccount"
						id={params.subaccountId}
						subAccounts={subAccounts}
						userData={user}
					/>
				</div>
			</BlurPage>
		);
	} catch (error) {
		console.error("Error in SubaccountSettingPage:", error);
		return <div>Something went wrong. Please try again later.</div>;
	}
};

export default SubaccountSettingPage;
