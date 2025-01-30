// src/app/nexusconjure/(main)/agency/page.tsx

import React from "react";
import AgencyDetails from "@/components/nexusconjure/forms/agency-details";
import {
	getAuthUserDetails,
	verifyAndAcceptInvitation,
} from "@/utils/nexusconjure/queries";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";

type Props = {
	searchParams: { plan?: Plan; state?: string; code?: string };
};

const Page = async ({ searchParams }: Props) => {
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

	// Accept the invitation and get agencyId
	const agencyId = await verifyAndAcceptInvitation();
	console.log("Agency ID:", agencyId);

	// Get the user's details based on email
	const user = await getAuthUserDetails(userEmail); // Modify this function to accept email

	if (!agencyId) {
		return redirect("/nexusconjure/agency");
	}

	// Check if the user's role is authorized
	if (
		user?.role !== "AGENCY_OWNER" &&
		user?.role !== "AGENCY_ADMIN" &&
		user?.role !== "SUBACCOUNT_GUEST" &&
		user?.role !== "SUBACCOUNT_USER"
	) {
		return <div>Not authorized</div>; // Or use your <Unauthorized /> component
	}

	// Role-based redirection
	if (user.role === "SUBACCOUNT_GUEST" || user.role === "SUBACCOUNT_USER") {
		return redirect("/nexusconjure/subaccount");
	} else if (user.role === "AGENCY_OWNER" || user.role === "AGENCY_ADMIN") {
		const { plan, state, code } = searchParams;

		if (plan) {
			return redirect(
				`/nexusconjure/agency/${agencyId}/billing?plan=${plan}`
			);
		}

		if (state) {
			const [statePath, stateAgencyId] = state.split("___");
			if (!stateAgencyId) return <div>Not authorized</div>;
			return redirect(
				`/nexusconjure/agency/${stateAgencyId}/${statePath}?code=${code}`
			);
		} else {
			return redirect(`/nexusconjure/agency/${agencyId}`);
		}
	}

	// If no agencyId, render the Create Agency form
	return (
		<div className="flex justify-center items-center mt-4">
			<div className="max-w-[850px] border-[1px] p-4 rounded-xl">
				<h1 className="text-4xl">Create An Agency</h1>
				<AgencyDetails
					data={{
						companyEmail: userEmail,
					}}
				/>
			</div>
		</div>
	);
};

export default Page;
