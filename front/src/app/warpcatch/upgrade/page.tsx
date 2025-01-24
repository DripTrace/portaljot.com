"use client";

import { createCheckoutSession } from "@/actions/demonstrate/warpcatch/createCheckoutSession";
import { createStripePortal } from "@/actions/demonstrate/warpcatch/createStripePortal";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/warpcatch/useSubscription";
import getStripe from "@/lib/warpcatch/stripe-js";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export type UserDetails = {
	email: string;
	name: string;
};

const PricingPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const { hasActiveMembership, loading } = useSubscription();
	const [isPending, startTransition] = useTransition();

	const handleUpgrade = () => {
		if (!user) return;

		const userDetails: UserDetails = {
			email: user.primaryEmailAddress?.toString()!,
			name: user.fullName!,
		};
		startTransition(async () => {
			const stripe = await getStripe();

			if (hasActiveMembership) {
				// create stripe portal...
				const stripePortalUrl = await createStripePortal();
				return router.push(stripePortalUrl);
			}

			const sessionId = await createCheckoutSession(userDetails);

			await stripe?.redirectToCheckout({
				sessionId,
			});
		});
	};

	return (
		<div>
			<div className="py-24 sm:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-base font-semibold leading-7">
						Pricing
					</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Supercharge your Document Companion
					</p>
				</div>

				<p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
					Choose an affordable plan thats packed with the best
					features for interacting with your PDFs, enhancing
					productivity, and streamlining your workflow.
				</p>

				<div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
					<div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
						<h3 className="mt-4 text-sm leading-6 text-gray-900">
							Starter Plan
						</h3>
						<p className="mt-4 text-sm leading-6 text-gray-600">
							Explore Core Features at No Cost
						</p>
						<p className="mt-6 flex items-baseline gap-x-1">
							<span className="text-4xl font-bold tracking-tight text-gray-900">
								Free
							</span>
						</p>

						<ul
							role="list"
							className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
						>
							<li className="flex gap-x-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								Up to 5 (3 Page) Document Uploads
							</li>
							<li className="flex gap-x-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								<strong>UNLIMITED</strong> Chat Messages
							</li>
							<li className="flex gap-x-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								Access to basic AI Chat Functionality
							</li>
						</ul>
					</div>
					<div className="ring-2 ring-indigo-600 rounded-3xl p-8">
						<h3 className="text-lg font-semibold leading-8 text-indigo-600">
							Pro Plan
						</h3>
						<p className="mt-4 text-sm leading-6 text-gray-600">
							Maximize Productivity with PRO Features
						</p>
						<p className="mt-6 flex items-baseline gap-x-1">
							<span className="text-4xl font-bold tracking-tight text-gray-900">
								$9.99
							</span>
							<span className="text-sm font-semibold leading-6 text-gray-600">
								/ month
							</span>
						</p>

						<Button
							className="bg-indigo-600 w-full text-white shadow-sm hover:bg-indigo-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 foxus-visible:outline-indigo-600"
							disabled={loading || isPending}
							onClick={handleUpgrade}
						>
							{isPending || loading
								? "Loading..."
								: hasActiveMembership
									? "Manage Subscription"
									: "Upgrade to Pro"}
						</Button>

						<ul
							role="list"
							className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
						>
							<li className="flex gap-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								Everything in the Free Plan
							</li>
							<li className="flex gap-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								<strong>UNLIMITED</strong> Document Uploads
							</li>
							<li className="flex gap-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								Full Power AI Chat Functionality with Memory
								Recall
							</li>
							<li className="flex gap-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								Advanced analytics
							</li>
							<li className="flex gap-3">
								<CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
								24-hour support response time
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PricingPage;
