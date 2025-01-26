// src/app/nexusconjure/(main)/agency/layout.tsx

import React from "react";
import BlurPage from "@/components/nexusconjure/global/blur-page";
import InfoBar from "@/components/nexusconjure/global/infobar";
import Sidebar from "@/components/nexusconjure/sidebar";
import Unauthorized from "@/components/nexusconjure/unauthorized";
import {
	getNotificationAndUser,
	verifyAndAcceptInvitation,
} from "@/utils/nexusconjure/queries";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
// import { UserRole } from "@/types/nexusconjure/user"; // Ensure correct path

type Props = {
	children: React.ReactNode;
	params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
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
	const user = await getAuthUserDetails(userEmail); // Ensure this function accepts email

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
		return <Unauthorized />;
	}

	// Role-based redirection
	if (user.role === "SUBACCOUNT_GUEST" || user.role === "SUBACCOUNT_USER") {
		return redirect("/nexusconjure/subaccount");
	} else if (user.role === "AGENCY_OWNER" || user.role === "AGENCY_ADMIN") {
		const { plan, state, code } = params; // Ensure these are correctly passed

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

	// Fetch notifications
	let allNoti: any = [];
	const notifications = await getNotificationAndUser(agencyId);
	if (notifications) allNoti = notifications;

	return (
		<div className="h-screen overflow-hidden">
			<Sidebar id={params.agencyId} type="agency" />
			<div className="md:pl-[300px]">
				<InfoBar notifications={allNoti} role={user.role} />
				<div className="relative">
					<BlurPage>{children}</BlurPage>
				</div>
			</div>
		</div>
	);
};

export default layout;
