import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs/promises";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export const config = {
	api: {
		bodyParser: false, // Disable body parsing to handle raw file data
	},
};

export async function POST(req: NextRequest) {
	try {
		const {
			cameraImage,
			documentName,
			stripeId,
			username,
			documentAction,
		} = await req.json();

		// Decode and save the image from the data URL
		const regex = /^data:.+\/(.+);base64,(.*)$/;
		const matches = cameraImage.match(regex);
		if (!matches || matches.length < 3) {
			return NextResponse.json(
				{ error: "Invalid image data" },
				{ status: 400 }
			);
		}

		const ext = matches[1];
		const data = matches[2];
		const buffer = Buffer.from(data, "base64");
		const documentPath = `/tmp/${documentName}.${ext}`;

		await fs.writeFile(documentPath, buffer);

		// Upload the file to Stripe
		const file = await stripe.files.create(
			{
				purpose: "account_requirement",
				file: {
					data: await fs.readFile(documentPath),
					name: `${documentName}.${ext}`,
					type: "application/octet-stream",
				},
			},
			{ stripeAccount: stripeId }
		);

		// Handle document verification actions
		let result;
		switch (documentAction) {
			case "bank-account-ownership":
				result = await stripe.accounts.update(stripeId, {
					documents: {
						bank_account_ownership_verification: {
							files: [file.id],
						},
					},
					metadata: { username },
				});
				console.log(
					"Bank account ownership verification updated:",
					result
				);
				break;

			case "business-tax-id":
				result = await stripe.accounts.update(stripeId, {
					company: {
						verification: { document: { front: file.id } },
					},
					metadata: { username },
				});
				console.log("Business tax ID verification updated:", result);
				break;

			default:
				console.log(`Unhandled action type: ${documentAction}`);
				return NextResponse.json(
					{ error: `Unhandled action type: ${documentAction}` },
					{ status: 400 }
				);
		}

		// Clean up the temporary file
		await fs.unlink(documentPath);
		console.log("Temporary file removed");

		return NextResponse.json({
			success: true,
			message: "Document processed successfully",
		});
	} catch (error) {
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ error: "An error occurred while processing the request" },
			{ status: 500 }
		);
	}
}
