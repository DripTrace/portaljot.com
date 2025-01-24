import {
	onGetAllCampaigns,
	onGetAllCustomers,
} from "@/actions/feature/spread/mail";
import EmailMarketing from "@/components/spread/email-marketing";
import InfoBar from "@/components/spread/infobar";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
	const user = await currentUser();

	if (!user) return null;
	const customers = await onGetAllCustomers(user.id);
	const campaigns = await onGetAllCampaigns(user.id);

	return (
		<>
			<InfoBar></InfoBar>
			<EmailMarketing
				campaign={campaigns?.campaign!}
				subscription={customers?.subscription!}
				domains={customers?.domains!}
			/>
		</>
	);
};

export default Page;
