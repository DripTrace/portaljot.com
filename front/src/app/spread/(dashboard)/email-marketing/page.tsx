// src/app/spread/(dashboard)/email-marketing/page.tsx

"use client";
import {
	onGetAllCampaigns,
	onGetAllCustomers,
} from "@/actions/feature/spread/mail";
import EmailMarketing from "@/components/spread/email-marketing";
import InfoBar from "@/components/spread/infobar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import React from "react";

type PageProps = {};

const Page = async (props: PageProps) => {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		// Optionally, redirect unauthenticated users
		// For example, using Next.js 13 redirect:
		// redirect('/api/auth/signin');
		return <p>You need to be authenticated to view this page.</p>;
	}

	// Ensure that the functions accept user.id as an argument
	const customers = await onGetAllCustomers(session.user.id);
	const campaigns = await onGetAllCampaigns(session.user.id);

	return (
		<>
			<InfoBar />
			<EmailMarketing
				campaign={campaigns?.campaign}
				subscription={customers?.subscription}
				domains={customers?.domains ?? []}
			/>
		</>
	);
};

export default Page;
