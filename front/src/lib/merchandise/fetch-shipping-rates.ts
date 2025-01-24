import { NextRequest, NextResponse } from "next/server";
import {
	PrintfulShippingItem,
	StripeShippingRate,
} from "@/types/merchandise/types";
import { getPrintfulClient } from "./printful-client";

type Data = {
	rates: StripeShippingRate[];
};

type Error = {
	errors: { key: string; message: string }[];
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { eventName, content } = await req.json();

		if (eventName !== "shippingrates.fetch") {
			return NextResponse.json({}, { status: 200 });
		}

		if (!content.items || content.items.length === 0) {
			return NextResponse.json(
				{
					errors: [
						{
							key: "no_items",
							message: "No items in cart to calculate shipping.",
						},
					],
				},
				{ status: 200 }
			);
		}

		const {
			items: cartItems,
			shippingAddress1,
			shippingAddress2,
			shippingAddressCity,
			shippingAddressCountry,
			shippingAddressProvince,
			shippingAddressPostalCode,
			shippingAddressPhone,
		} = content;

		const recipient = {
			...(shippingAddress1 && { address1: shippingAddress1 }),
			...(shippingAddress2 && { address2: shippingAddress2 }),
			...(shippingAddressCity && { city: shippingAddressCity }),
			...(shippingAddressCountry && {
				country_code: shippingAddressCountry,
			}),
			...(shippingAddressProvince && {
				state_code: shippingAddressProvince,
			}),
			...(shippingAddressPostalCode && {
				zip: shippingAddressPostalCode,
			}),
			...(shippingAddressPhone && { phone: shippingAddressPhone }),
		};

		// Map cart items to PrintfulShippingItem structure
		const items: PrintfulShippingItem[] = cartItems.map(
			(item: any): PrintfulShippingItem => ({
				external_variant_id: item.external_variant_id, // Adjusted to match Printful's API
				quantity: item.quantity,
			})
		);

		const printfulClient = await getPrintfulClient();
		const { result } = await printfulClient.post("shipping/rates", {
			recipient,
			items,
		});

		const rates: StripeShippingRate[] = result.map((rate: any) => ({
			cost: rate.rate,
			description: rate.name,
			userDefinedId: rate.id,
			guaranteedDaysToDelivery: rate.maxDeliveryDays,
		}));

		return NextResponse.json({ rates }, { status: 200 });
	} catch (error: any) {
		console.error("Error retrieving shipping rates:", error);
		return NextResponse.json(
			{
				errors: [
					{
						key: error?.reason || "unknown_error",
						message: error?.message || "An unknown error occurred.",
					},
				],
			},
			{ status: 500 }
		);
	}
}
