import { onGetAllAccountDomains } from "@/actions/feature/spread/settings";
import ConversationMenu from "@/components/spread/conversations";
import Messenger from "@/components/spread/conversations/messenger";
import InfoBar from "@/components/spread/infobar";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

const ConversationPage = async (props: Props) => {
	const domains = await onGetAllAccountDomains();
	return (
		<div className="w-full h-full flex">
			<ConversationMenu domains={domains?.domains} />

			<Separator orientation="vertical" />
			<div className="w-full flex flex-col">
				<div className="px-5">
					<InfoBar />
				</div>
				<Messenger />
			</div>
		</div>
	);
};

export default ConversationPage;
