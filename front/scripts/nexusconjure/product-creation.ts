import * as dotenv from "dotenv";
import { createStripeProductWithPrices } from "./stripe-create-product";

// Load environment variables
dotenv.config();

const products = [
	{
		name: "Pixel Novice Path",
		description:
			"Perfect for small agencies looking to streamline their operations.",
		features: [
			"5 Sub accounts",
			"3 Team members",
			"Basic automation",
			"24/7 Support",
		],
		prices: [
			{ amount: 4900, interval: "month" as const },
			{ amount: 39000, interval: "year" as const },
		],
	},
	{
		name: "Digital Catalyst Suite",
		description:
			"Ideal for growing agencies aiming to scale their digital impact.",
		features: [
			"15 Sub accounts",
			"10 Team members",
			"Advanced automation",
			"Priority support",
			"Custom integrations",
		],
		prices: [
			{ amount: 24900, interval: "month" as const },
			{ amount: 199000, interval: "year" as const },
		],
	},
	{
		name: "NexusConjure Elite Package",
		description:
			"Tailored for visionary enterprises seeking maximum digital leverage.",
		features: [
			"Unlimited Sub accounts",
			"Unlimited Team members",
			"AI-powered automation",
			"Dedicated account manager",
			"Custom development",
			"Enterprise-grade security",
		],
		prices: [
			{ amount: 44900, interval: "month" as const },
			{ amount: 379000, interval: "year" as const },
		],
	},
];

async function createProducts() {
	for (const product of products) {
		try {
			console.log(`Creating product: ${product.name}`);
			await createStripeProductWithPrices(
				{
					name: product.name,
					description: product.description,
					features: product.features.join(", "),
				},
				product.prices
			);
			console.log(
				`Successfully created product and prices for: ${product.name}`
			);
		} catch (error) {
			console.error(`Error creating product ${product.name}:`, error);
		}
	}
}

createProducts()
	.then(() => {
		console.log("All products created successfully");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Error in product creation script:", error);
		process.exit(1);
	});
