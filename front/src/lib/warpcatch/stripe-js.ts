import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_WARPCATCH === undefined) {
	throw new Error("Stripe Public key not found");
}

const getStripe = (): Promise<Stripe | null> => {
	if (!stripePromise) {
		stripePromise = loadStripe(
			`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_WARPCATCH!}`
		);
	}

	return stripePromise;
};

export default getStripe;
