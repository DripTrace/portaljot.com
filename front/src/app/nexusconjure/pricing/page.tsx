"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import clsx from "clsx";
import Navigation from "@/components/nexusconjure/site/navigation";

interface PricingPlan {
	id: string;
	name: string;
	description: string;
	monthlyPrice: number;
	annualPrice: number;
	features: string[];
	borderColors: string[];
}

const pricingPlans: PricingPlan[] = [
	{
		id: "starter",
		name: "Pixel Novice Path",
		description:
			"Perfect for small agencies looking to streamline their operations.",
		monthlyPrice: 49,
		annualPrice: 39,
		features: [
			"5 Sub accounts",
			"3 Team members",
			"Basic automation",
			"24/7 Support",
		],
		borderColors: ["#3b82f6", "#22d3ee", "#10b981"],
	},
	{
		id: "pro",
		name: "Digital Catalyst Suite",
		description:
			"Ideal for growing agencies aiming to scale their digital impact.",
		monthlyPrice: 249,
		annualPrice: 199,
		features: [
			"15 Sub accounts",
			"10 Team members",
			"Advanced automation",
			"Priority support",
			"Custom integrations",
		],
		borderColors: ["#8b5cf6", "#ec4899", "#ef4444"],
	},
	{
		id: "enterprise",
		name: "NexusConjure Elite Package",
		description:
			"Tailored for visionary enterprises seeking maximum digital leverage.",
		monthlyPrice: 449,
		annualPrice: 379,
		features: [
			"Unlimited Sub accounts",
			"Unlimited Team members",
			"AI-powered automation",
			"Dedicated account manager",
			"Custom development",
			"Enterprise-grade security",
		],
		borderColors: ["#facc15", "#f97316", "#ef4444"],
	},
];

export default function PricingComponent() {
	const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">(
		"annually"
	);

	useEffect(() => {
		const style = document.createElement("style");
		style.textContent = `
      @keyframes flashBorder {
        0%, 100% { border-color: var(--color-1); }
        33% { border-color: var(--color-2); }
        66% { border-color: var(--color-3); }
      }
      .flash-border {
        animation: flashBorder 4s linear infinite;
      }
      .price-transition {
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
      }
      .price-enter {
        transform: translateY(20px);
        opacity: 0;
      }
      .price-enter-active {
        transform: translateY(0);
        opacity: 1;
      }
      .price-exit {
        position: absolute;
        transform: translateY(0);
        opacity: 1;
      }
      .price-exit-active {
        transform: translateY(-20px);
        opacity: 0;
      }
    `;
		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<>
			<Navigation />
			<div className="min-h-screen bg-gray-900 text-white py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-4xl font-bold text-center mb-4">
						Choose what fits you right
					</h1>
					<p className="text-xl text-center text-gray-400 mb-12">
						Our straightforward pricing plans are tailored to meet
						your needs. If you&apos;re not ready to commit, you can
						get started with our basic plan.
					</p>

					<div className="flex justify-center mb-12">
						<Button
							variant={
								billingPeriod === "monthly"
									? "default"
									: "outline"
							}
							onClick={() => setBillingPeriod("monthly")}
							className="rounded-l-md px-6 py-2 mr-1"
						>
							Monthly
						</Button>
						<Button
							variant={
								billingPeriod === "annually"
									? "default"
									: "outline"
							}
							onClick={() => setBillingPeriod("annually")}
							className="rounded-r-md px-6 py-2 ml-1"
						>
							Annually
						</Button>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{pricingPlans.map((plan) => (
							<div
								key={plan.id}
								className="relative group"
								style={
									{
										"--color-1": plan.borderColors[0],
										"--color-2": plan.borderColors[1],
										"--color-3": plan.borderColors[2],
									} as React.CSSProperties
								}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
								<Card className="bg-gray-800 border-2 flash-border relative z-10 transition-all duration-300 group-hover:scale-105">
									<CardHeader>
										<CardTitle className="text-2xl">
											{plan.name}
										</CardTitle>
										<CardDescription className="text-gray-400">
											{plan.description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="relative h-20">
											<div
												className={clsx(
													"price-transition absolute w-full",
													billingPeriod === "annually"
														? "price-enter-active"
														: "price-exit-active"
												)}
											>
												<span className="text-5xl font-bold">
													${plan.annualPrice}
												</span>
												<span className="text-xl font-normal text-gray-400">
													/ month
												</span>
											</div>
											<div
												className={clsx(
													"price-transition absolute w-full",
													billingPeriod === "monthly"
														? "price-enter-active"
														: "price-exit-active"
												)}
											>
												<span className="text-5xl font-bold">
													${plan.monthlyPrice}
												</span>
												<span className="text-xl font-normal text-gray-400">
													/ month
												</span>
											</div>
										</div>
										<p className="text-sm text-gray-400 mb-6">
											Billed{" "}
											{billingPeriod === "annually"
												? "annually"
												: "monthly"}
											{billingPeriod === "annually" &&
												` (save ${Math.round(
													((plan.monthlyPrice * 12 -
														plan.annualPrice * 12) /
														(plan.monthlyPrice *
															12)) *
														100
												)}%)`}
										</p>
										<ul className="space-y-3">
											{plan.features.map(
												(feature, index) => (
													<li
														key={index}
														className="flex items-center"
													>
														<Check className="mr-2 h-5 w-5 text-blue-500" />
														<span>{feature}</span>
													</li>
												)
											)}
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
											Get Started
										</Button>
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
