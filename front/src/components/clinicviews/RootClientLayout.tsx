"use client";

import { useEffect } from "react";
import DomainProvider from "@/components/clinicviews/RootStoreProvider";
import InstallPrompt from "./SafeInstallPrompt";
import NotificationExample from "./NotificationExample";

interface RootClientLayoutProps {
	children: React.ReactNode;
}

const RootClientLayout: React.FC<RootClientLayoutProps> = ({ children }) => {
	useEffect(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator) {
			window.addEventListener("load", function () {
				navigator.serviceWorker.register("/clinicviews/sw.js").then(
					function (registration) {
						console.log(
							"Service Worker registration successful with scope: ",
							registration.scope
						);
					},
					function (err) {
						console.log(
							"Service Worker registration failed: ",
							err
						);
					}
				);
			});
		}
	}, []);

	return (
		<html lang="en">
			<body>
				{/* <NotificationExample /> */}
				{/* <InstallPrompt /> */}
				<DomainProvider>{children}</DomainProvider>
			</body>
		</html>
	);
};

export default RootClientLayout;
