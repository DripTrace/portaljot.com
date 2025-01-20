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

interface Price {
	id: string;
	unit_amount: number;
	recurring: {
		interval: "month" | "year";
	};
}

interface Product {
	id: string;
	name: string;
	description: string;
	metadata: {
		features: string;
	};
	prices: Price[];
}

export default function PricingComponent() {
	const [products, setProducts] = useState<Product[]>([]);
	const [billingPeriod, setBillingPeriod] = useState<"month" | "year">(
		"year"
	);

	useEffect(() => {
		async function fetchProducts() {
			const response = await fetch("/api/stripe/get-products");
			const data = await response.json();
			setProducts(data);
		}
		fetchProducts();
	}, []);

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
    `;
		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	const borderColors = [
		["#3b82f6", "#22d3ee", "#10b981"],
		["#8b5cf6", "#ec4899", "#ef4444"],
		["#facc15", "#f97316", "#ef4444"],
	];

	return (
		<div className="min-h-screen bg-gray-900 text-white py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-4">
					Choose what fits you right
				</h1>
				<p className="text-xl text-center text-gray-400 mb-12">
					Our straightforward pricing plans are tailored to meet your
					needs. If you&apos;re not ready to commit, you can get
					started with our basic plan.
				</p>

				<div className="flex justify-center mb-12">
					<Button
						variant={
							billingPeriod === "month" ? "default" : "outline"
						}
						onClick={() => setBillingPeriod("month")}
						className="rounded-l-md px-6 py-2 mr-1"
					>
						Monthly
					</Button>
					<Button
						variant={
							billingPeriod === "year" ? "default" : "outline"
						}
						onClick={() => setBillingPeriod("year")}
						className="rounded-r-md px-6 py-2 ml-1"
					>
						Annually
					</Button>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{products.map((product, index) => {
						const price = product.prices.find(
							(p) => p.recurring.interval === billingPeriod
						);
						const colors = borderColors[index] || [
							"#cccccc",
							"#cccccc",
							"#cccccc",
						];

						return (
							<div
								key={product.id}
								className="relative group"
								style={
									{
										"--color-1": colors[0],
										"--color-2": colors[1],
										"--color-3": colors[2],
									} as React.CSSProperties
								}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
								<Card className="bg-gray-800 border-2 flash-border relative z-10 transition-all duration-300 group-hover:scale-105">
									<CardHeader>
										<CardTitle className="text-2xl">
											{product.name}
										</CardTitle>
										<CardDescription className="text-gray-400">
											{product.description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="relative h-20">
											<div
												className={clsx(
													"price-transition absolute w-full",
													billingPeriod === "year"
														? "price-enter-active"
														: "price-enter"
												)}
											>
												<span className="text-5xl font-bold">
													$
													{price
														? (
																price.unit_amount /
																100
														  ).toFixed(2)
														: "N/A"}
												</span>
												<span className="text-xl font-normal text-gray-400">
													/ {billingPeriod}
												</span>
											</div>
										</div>
										<ul className="space-y-3">
											{product.metadata.features
												.split(",")
												.map((feature, index) => (
													<li
														key={index}
														className="flex items-center"
													>
														<Check className="mr-2 h-5 w-5 text-blue-500" />
														<span>
															{feature.trim()}
														</span>
													</li>
												))}
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
											Get Started
										</Button>
									</CardFooter>
								</Card>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
