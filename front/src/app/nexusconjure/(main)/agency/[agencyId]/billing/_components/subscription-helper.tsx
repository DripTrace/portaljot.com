"use client";
import SubscriptionFormWrapper from "@/components/nexusconjure/forms/subscription-form/subscription-form-wrapper";
import CustomModal from "@/components/nexusconjure/global/custom-modal";
import { PricesList } from "@/utils/nexusconjure/types";
import { useModal } from "@/providers/nexusconjure/modal-provider";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
	prices: PricesList["data"];
	customerId: string;
	planExists: boolean;
};

const SubscriptionHelper = ({ customerId, planExists, prices }: Props) => {
	const { setOpen } = useModal();
	const searchParams = useSearchParams();
	const plan = searchParams?.get("plan");

	useEffect(() => {
		if (plan)
			setOpen(
				<CustomModal
					title="Upgrade Plan!"
					subheading="Get started today to get access to premium features"
				>
					<SubscriptionFormWrapper
						planExists={planExists}
						customerId={customerId}
					/>
				</CustomModal>,
				async () => ({
					plans: {
						defaultPriceId: plan ? plan : "",
						plans: prices,
					},
				})
			);
	}, [plan]);

	return <div>SubscriptionHelper</div>;
};

export default SubscriptionHelper;
