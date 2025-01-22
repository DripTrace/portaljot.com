"use client";

import useSubscription from "@/hooks/warpcatch/useSubscription";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2Icon, StarIcon } from "lucide-react";
import { createStripePortal } from "@/actions/warpcatch/createStripePortal";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const UpgradeButton = () => {
	const router = useRouter();
	const { hasActiveMembership, loading } = useSubscription();
	const [isPending, startTransition] = useTransition();

	const handleAccount = () => {
		console.log("DEBUG 1 ", "BUTTON CLICKED");
		console.log("DEBUG 2", router);

		console.log("DEBUG 1 ", hasActiveMembership);
		startTransition(async () => {
			const stripePortalUrl = await createStripePortal();
			router.push(stripePortalUrl);
		});
	};

	if (!hasActiveMembership && !loading)
		return (
			<Button asChild variant="default" className="border-indigo-600">
				<Link href="/warpcatch/upgrade">
					Upgrade{" "}
					<StarIcon className="ml-3 fill-indigo-600 text-white" />
				</Link>
			</Button>
		);

	if (loading)
		return (
			<Button variant="default" className="border-indigo-600">
				<Loader2Icon className="animate-spin" />
			</Button>
		);

	return (
		<Button
			onClick={handleAccount}
			disabled={isPending}
			variant="default"
			className="border-indigo-600 bg-indigo-600"
		>
			{isPending ? (
				<Loader2Icon className="animate-spin" />
			) : (
				<p>
					<span className="font-extrabold">PRO Account</span>
				</p>
			)}
		</Button>
	);
};

export default UpgradeButton;
