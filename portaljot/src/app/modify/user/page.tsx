"use client";

import { useEffect } from "react";
import { checkNextAuthSession } from "@/actions/modify/checkNextAuthSession";
import UserComponent from "@/components/modify/UserComponent";
import GlassContent from "@/store/change/modify/GlassContent";

const title = "Welcome to PortalJot 👋";
const subtitle =
	"You will find a plethora of options to create the custom video for you";

const UserPage = () => {
	useEffect(() => {
		async function fetchSession() {
			await checkNextAuthSession();
		}
		fetchSession();
	}, []);

	return (
		<GlassContent title="User" description={`${title} - ${subtitle}`}>
			<UserComponent />
		</GlassContent>
	);
};

export default UserPage;
