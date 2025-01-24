import { NextRequest, NextResponse } from "next/server";
import { PrintfulShippingItem, StripeTaxItem } from "@/types/merchandise/types";
import { getPrintfulClient } from "./printful-client";

type Data = {
	taxes: StripeTaxItem[];
};

type Error = {
	errors: { key: string; message: string }[];
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { eventName, mode, createdOn, content } = await req.json();

		if (content.items.length === 0) {
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
			(item: any): PrintfulShippingItem => ({
				external_variant_id: item.id,
				quantity: item.quantity,
			})
		);

		const printfulClient = await getPrintfulClient();
		const { result } = await printfulClient.post("orders/estimate-costs", {
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
	} catch (e) {
		console.error("Error retrieving tax calculation:", e);
		return NextResponse.json(
			{
				errors: [
					{
						key: "tax_calculation_failed",
						message: "Failed to calculate taxes.",
					},
				],
			},
			{ status: 500 }
		);
	}
}
