// "use client";

// import { db } from "@/firebase";
// import { addDoc, collection, onSnapshot } from "firebase/firestore";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import { useSubscriptionStore } from "@/store/exotalk/store";
// import ManageAccountButton from "./ManageAccountButton";
// import LoadingSpinner from "./loadingSpinner";
// import { useToast } from "@/hooks/use-toast";

// function CheckoutButton() {
// 	const [loading, setLoading] = useState(false);
// 	const subscription = useSubscriptionStore((state) => state.subscription);
// 	const { data: session } = useSession();
// 	const { toast } = useToast();

// 	const isLoadingSubscription = subscription === undefined;
// 	const isSubscribed = subscription?.status === "active";

// 	const createCheckoutSession = async () => {
// 		if (!session?.user.id) {
// 			toast({
// 				title: "Error",
// 				description: "Please sign in first",
// 				variant: "destructive",
// 			});
// 			return;
// 		}

// 		setLoading(true);

// 		try {
// 			// Create a checkout session
// 			const docRef = await addDoc(
// 				collection(
// 					db,
// 					"customers",
// 					session.user.id,
// 					"checkout_sessions"
// 				),
// 				{
// 					price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID, // Use your TEST mode price ID here
// 					success_url: window.location.origin,
// 					cancel_url: window.location.origin,
// 					mode: "subscription",
// 				}
// 			);

// 			// Wait for the CheckoutSession to get attached by the extension
// 			onSnapshot(docRef, (snap) => {
// 				const data = snap.data();
// 				const url = data?.url;
// 				const error = data?.error;

// 				if (error) {
// 					// Show an error to your customer and inspect your Cloud Function logs
// 					toast({
// 						title: "Error",
// 						description: `An error occurred: ${error.message}`,
// 						variant: "destructive",
// 					});
// 					setLoading(false);
// 				}

// 				if (url) {
// 					window.location.assign(url);
// 					setLoading(false);
// 				}
// 			});
// 		} catch (error: any) {
// 			console.error("Error:", error);
// 			toast({
// 				title: "Error",
// 				description: error.message || "Something went wrong",
// 				variant: "destructive",
// 			});
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="flex flex-col space-y-2">
// 			{isSubscribed && (
// 				<>
// 					<hr className="mt-5" />
// 					<p className="pt-5 text-center text-xs text-indigo-600">
// 						You are subscribed to PRO
// 					</p>
// 				</>
// 			)}
// 			<div className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default">
// 				{isSubscribed ? (
// 					<ManageAccountButton />
// 				) : isLoadingSubscription || loading ? (
// 					<LoadingSpinner />
// 				) : (
// 					<button
// 						onClick={() => createCheckoutSession()}
// 						className="w-full"
// 					>
// 						Sign Up
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// export default CheckoutButton;

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/exotalk/store";
import ManageAccountButton from "./ManageAccountButton";
import LoadingSpinner from "./loadingSpinner";
import { useToast } from "@/hooks/use-toast";

function CheckoutButton() {
	const [loading, setLoading] = useState(false);

	const subscription = useSubscriptionStore((state) => state.subscription);
	const { data: session } = useSession();
	const { toast } = useToast();

	const isLoadingSubscription = subscription === undefined;
	const isSubscribed = subscription?.status === "active";

	async function createCheckoutSession() {
		if (!session?.user.id) {
			toast({
				title: "Error",
				description: "Please sign in first",
				variant: "destructive",
			});
			return;
		}

		setLoading(true);

		try {
			// 1) POST to our /api/checkout route to create the session
			const res = await fetch("/api/exotalk/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: session.user.id,
					// This is your Stripe Price ID
					priceId:
						process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_ID_EXOTALK,
					successUrl: window.location.origin,
					cancelUrl: window.location.origin,
					mode: "subscription",
				}),
			});

			if (!res.ok) {
				throw new Error(
					`Failed to create checkout session: ${res.status}`
				);
			}

			const data = await res.json();

			if (data.error) {
				toast({
					title: "Error",
					description: `An error occurred: ${data.error}`,
					variant: "destructive",
				});
				setLoading(false);
				return;
			}

			// 2) If we have a session url, redirect
			if (data.url) {
				window.location.assign(data.url);
				// No need to setLoading(false) here, the user is leaving
			} else {
				throw new Error("No URL returned from the server.");
			}
		} catch (error: any) {
			console.error("Error creating checkout session:", error);
			toast({
				title: "Error",
				description: error.message || "Something went wrong",
				variant: "destructive",
			});
			setLoading(false);
		}
	}

	return (
		<div className="flex flex-col space-y-2">
			{isSubscribed && (
				<>
					<hr className="mt-5" />
					<p className="pt-5 text-center text-xs text-indigo-600">
						You are subscribed to PRO
					</p>
				</>
			)}

			<div className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default">
				{isSubscribed ? (
					<ManageAccountButton />
				) : isLoadingSubscription || loading ? (
					<LoadingSpinner />
				) : (
					<button onClick={createCheckoutSession} className="w-full">
						Sign Up
					</button>
				)}
			</div>
		</div>
	);
}

export default CheckoutButton;
