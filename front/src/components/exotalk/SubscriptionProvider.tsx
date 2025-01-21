// "use client";

// import { useEffect } from "react";
// import { onSnapshot } from "firebase/firestore";
// import { useSubscriptionStore } from "@/store/exotalk/store";
// import { subscriptionRef } from "@/lib/exotalk/converters/Subscription";
// import { useSession } from "next-auth/react";

// export default function SubscriptionProvider({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	const { data: session } = useSession();

// 	const setSubscription = useSubscriptionStore(
// 		(state) => state.setSubscription
// 	);

// 	useEffect(() => {
// 		if (!session?.user.id) return;

// 		return onSnapshot(
// 			subscriptionRef(session.user.id),
// 			(snapshot) => {
// 				if (snapshot.empty) {
// 					console.log(session.user);
// 					// console.log(snapshot.docs[0]);
// 					console.log("No such document!");
// 					setSubscription(null);
// 				} else {
// 					console.log("Document data:", snapshot.docs[0].data());

// 					setSubscription(snapshot.docs[0].data());
// 				}
// 			},
// 			(error) => {
// 				console.log("Error getting document:", error);
// 			}
// 		);
// 	}, [session, setSubscription]);

// 	return <>{children}</>;
// }

"use client";

import { useEffect } from "react";
import { useSubscriptionStore } from "@/store/exotalk/store";
import { useSession } from "next-auth/react";

export default function SubscriptionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session } = useSession();
	const setSubscription = useSubscriptionStore(
		(state) => state.setSubscription
	);

	useEffect(() => {
		if (!session?.user?.id) {
			// If no user, clear subscription or do nothing
			setSubscription(null);
			return;
		}

		// Fetch the subscription from our Prisma-based API
		async function fetchSubscription() {
			try {
				const res = await fetch(
					`/api/exotalk/subscription?userId=${session!.user.id}`
				);
				if (!res.ok) {
					throw new Error(
						`Failed to fetch subscription: ${res.status}`
					);
				}
				const data = await res.json();
				// data.subscription might be null or an object
				setSubscription(data.subscription || null);
			} catch (error) {
				console.error("Error fetching subscription:", error);
				setSubscription(null);
			}
		}

		fetchSubscription();
	}, [session?.user?.id, setSubscription]);

	return <>{children}</>;
}
