import { getPrintfulClient } from "@/lib/merchandise/printful-client";
import { PrintfulShippingItem, StripeTaxItem } from "@/types/merchandise/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = await req.json();
		const { eventName, content } = body;

		if (eventName !== "shippingrates.fetch") {
			return NextResponse.json({}, { status: 200 });
		}

		if (!content || content.items.length === 0) {
			return NextResponse.json(
				{
					errors: [
						{
							key: "no_items",
							message: "No items in cart to calculate taxes.",
						},
					],
				},
				{ status: 200 }
			);
		}

		const {
			items: cartItems,
			shippingAddress,
			shippingRateUserDefinedId,
		} = content;

		if (!shippingAddress) {
			return NextResponse.json(
				{
					errors: [
						{
							key: "no_address",
							message: "No address to calculate taxes.",
						},
					],
				},
				{ status: 200 }
			);
		}

		const {
			address1,
			address2,
			city,
			country,
			province,
			postalCode,
			phone,
		} = shippingAddress;

		const recipient = {
			...(address1 && { address1 }),
			...(address2 && { address2 }),
			...(city && { city }),
			...(country && { country_code: country }),
			...(province && { state_code: province }),
			...(postalCode && { zip: postalCode }),
			...(phone && { phone }),
		};

		const items: PrintfulShippingItem[] = cartItems.map(
			(item: { id: string; quantity: number }): PrintfulShippingItem => ({
				external_variant_id: item.id,
				quantity: item.quantity,
			})
		);

		const printful = await getPrintfulClient();
		const { result } = await printful.post("orders/estimate-costs", {
			shipping: shippingRateUserDefinedId,
			recipient,
			items,
		});

		return NextResponse.json(
			{
				taxes: [
					{
						name: "VAT",
						amount: result.costs.vat,
						rate: 0,
					},
				],
			},
			{ status: 200 }
		);
	} catch (error: unknown) {
		console.error("Error calculating taxes:", error);
		return NextResponse.json(
			{
				errors: [
					{
						key: (error as any)?.reason || "unknown_error",
						message:
							(error as any)?.message ||
							"An unexpected error occurred.",
					},
				],
			},
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
