import { onLoginUser } from "@/actions/feature/spread/auth";
import SideBar from "@/components/spread/sidebar";
import { ChatProvider } from "@/context/spread/user-chat-context";
import React from "react";

type Props = {
	children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
	const authenticated = await onLoginUser();
	if (!authenticated) return null;

	return (
		<ChatProvider>
			<div className="flex h-screen w-full">
				<SideBar domains={authenticated.domain} />
				<div className="w-full h-screen flex flex-col pl-20 md:pl-4">
					{children}
				</div>
			</div>
		</ChatProvider>
	);
};

export default OwnerLayout;
