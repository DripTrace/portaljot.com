import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import axios from "axios";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId, personId, documentUploadUrl } =
			await req.json();

		if (!stripeId || !documentUploadUrl) {
			return NextResponse.json(
				{ error: "Missing required parameters." },
				{ status: 400 }
			);
		}

		// Helper function to download the image
		const downloadImage = async (
			url: string,
			imagePath: string
		): Promise<void> => {
			const response = await axios({
				url,
				responseType: "stream",
			});
			await new Promise<void>((resolve, reject) => {
				const writer = response.data.pipe(
					require("fs").createWriteStream(imagePath)
				);
				writer.on("finish", resolve);
				writer.on("error", reject);
			});
		};

		// Temporary file path for the downloaded image
		const imagePath = "/tmp/success.png";

		// Download the image to the temporary file path
		await downloadImage(documentUploadUrl, imagePath);

		// Upload the file to Stripe
		const file = await stripe.files.create(
			{
				purpose: "account_requirement",
				file: {
					data: require("fs").readFileSync(imagePath),
					name: "success.png",
					type: "application/octet-stream",
				},
			},
			{
				stripeAccount: stripeId,
			}
		);

		// Update the Stripe account with the uploaded file
		await stripe.accounts.update(stripeId, {
			company: {
				verification: {
					document: {
						front: file.id,
					},
				},
			},
		});

		// Respond with the file ID
		return NextResponse.json(
			{ success: true, fileId: file.id },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ error: "An error occurred while processing the request." },
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
