// app/api/appointment/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { patientId, date, time } = await req.json();

		const tokenResponse = await fetch(
			"http://localhost:2999/api/clinicviews/get-token/route"
		);
		if (!tokenResponse.ok) {
			throw new Error("Failed to fetch access token");
		}
		const { accessToken } = await tokenResponse.json();

		const eventUrl =
			"https://graph.microsoft.com/v1.0/users/fsclinicals-com@mail.clinicviews.com/calendar/events";
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
			throw new Error("Failed to create appointment suggestion");
		}

		return NextResponse.json(
			{ message: "Appointment suggestion received" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error suggesting appointment:", error);
		return NextResponse.json(
			{ error: "Error suggesting appointment" },
			{ status: 500 }
		);
	}
}
