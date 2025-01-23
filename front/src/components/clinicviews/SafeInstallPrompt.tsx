"use client";

import React, { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";

const NotificationPrompt: React.FC = () => {
	const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

	useEffect(() => {
		if (Notification.permission === "default") {
			setShowNotificationPrompt(true);
		}
	}, []);

	const handleNotificationPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			console.log("Notification permission:", permission);
			setShowNotificationPrompt(false);
		} catch (error) {
			console.error("Error requesting notification permission:", error);
			setShowNotificationPrompt(false);
		}
	};

	if (!showNotificationPrompt) return null;

	return (
		<div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
			<p className="text-gray-800 mb-3">
				Would you like to receive notifications?
			</p>
			<button
				onClick={handleNotificationPermission}
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
			>
				Allow Notifications
			</button>
		</div>
	);
};

const InstallPrompt: React.FC = () => {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [showInstallPrompt, setShowInstallPrompt] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setShowInstallPrompt(true);
			console.log("Before install prompt event captured");
		};

		window.addEventListener(
			"beforeinstallprompt",
			handleBeforeInstallPrompt
		);

		console.log("Install prompt event listener added");

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const handleInstallClick = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then(
				(choiceResult: { outcome: string }) => {
					if (choiceResult.outcome === "accepted") {
						console.log("User accepted the install prompt");
					} else {
						console.log("User dismissed the install prompt");
					}
					setDeferredPrompt(null);
					setShowInstallPrompt(false);
				}
			);
		}
	};

	if (!showInstallPrompt) return null;

	return (
		<div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
			<p className="text-gray-800 mb-3">
				Would you like to install this app?
			</p>
			<div className="flex space-x-2">
				<button
					onClick={handleInstallClick}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				>
					Install
				</button>
				<button
					onClick={() => setShowInstallPrompt(false)}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
				>
					Not now
				</button>
			</div>
		</div>
	);
};

const SafePrompts: React.FC = () => {
	return (
		<ErrorBoundary>
			<NotificationPrompt />
			<InstallPrompt />
		</ErrorBoundary>
	);
};

export default SafePrompts;
