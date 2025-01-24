import { NextRequest, NextResponse } from "next/server";
import {
	addPatient,
	getPatient,
} from "@/utils/clinicviews/fsclinicalsIndexedDB";
import { v4 as uuidv4 } from "uuid";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req: NextRequest) {
	try {
		if (req.method === "POST") {
			const { name, email, phone } = await req.json();
			if (!name || !email || !phone) {
				return NextResponse.json(
					{
						message:
							"Missing required fields: name, email, or phone",
					},
					{ status: 400 }
				);
			}

			const patient = {
				id: uuidv4(),
				name,
				email,
				phone,
			};

			await addPatient(patient);

			return NextResponse.json(
				{
					message: "Patient registered successfully",
					patient,
				},
				{ status: 201 }
			);
		} else if (req.method === "GET") {
			const id = req.nextUrl.searchParams.get("id");

			if (!id) {
				return NextResponse.json(
					{ message: "Patient ID is required" },
					{ status: 400 }
				);
			}

			const patient = await getPatient(id);

			if (!patient) {
				return NextResponse.json(
					{ message: "Patient not found" },
					{ status: 404 }
				);
			}

			return NextResponse.json(patient, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: `Method ${req.method} Not Allowed` },
				{ status: 405 }
			);
		}
	} catch (error) {
		console.error("Error handling request:", error);
		return NextResponse.json(
			{
				message: "An error occurred while processing the request",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
