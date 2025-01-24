import { NextRequest, NextResponse } from "next/server";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req: NextRequest) {
	if (req.method !== "POST") {
		return NextResponse.json(
			{ error: `Method ${req.method} Not Allowed` },
			{ status: 405 }
		);
	}

	try {
		const { patientId, date, time } = await req.json();

		if (!patientId || !date || !time) {
			return NextResponse.json(
				{ error: "Missing required fields: patientId, date, or time" },
				{ status: 400 }
			);
		}

		// Get access token
		const tokenResponse = await fetch(
			"http://localhost:2999/api/clinicviews/get-token/route"
		);

		if (!tokenResponse.ok) {
			throw new Error("Failed to fetch access token");
		}

		const { accessToken } = await tokenResponse.json();

		if (!accessToken) {
			throw new Error("Access token is missing from the response");
		}

		// Create calendar event
		const eventUrl = `https://graph.microsoft.com/v1.0/users/fsclinicals-com@mail.clinicviews.com/calendar/events`;
		const event = {
			subject: "Appointment Suggestion",
			start: {
				dateTime: `${date}T${time}`,
				timeZone: "Pacific Standard Time",
			},
			end: {
				dateTime: `${date}T${time}`,
				timeZone: "Pacific Standard Time",
			},
			body: {
				contentType: "Text",
				content: `Appointment suggested for patient ID: ${patientId}`,
			},
		};

		const response = await fetch(eventUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(event),
		});

		if (!response.ok) {
			const errorDetails = await response.text();
			throw new Error(
				`Failed to create appointment suggestion: ${errorDetails}`
			);
		}

		return NextResponse.json(
			{
				message: "Appointment suggestion received",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error suggesting appointment:", error);
		return NextResponse.json(
			{
				error: "Error suggesting appointment",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
