// app/api/create-appointment/route.ts

import { NextRequest, NextResponse } from "next/server";

interface AppointmentResponse {
	id: string;
	subject: string;
	start: {
		dateTime: string;
		timeZone: string;
	};
	end: {
		dateTime: string;
		timeZone: string;
	};
	attendees: {
		emailAddress: {
			address: string;
			name: string;
		};
		type: string;
	}[];
}

interface ErrorResponse {
	error: {
		code: string;
		message: string;
	};
}

export async function POST(req: NextRequest) {
	try {
		const { accessToken, patientName, email, appointmentDateTime } =
			await req.json();

		if (!accessToken || !patientName || !email || !appointmentDateTime) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const eventUrl = `https://graph.microsoft.com/v1.0/users/fsclinicals-com@mail.clinicviews.com/calendar/events`;

		const endDateTime = new Date(
			new Date(appointmentDateTime).getTime() + 60 * 60 * 1000
		).toISOString();

		const eventBody = {
			subject: `Appointment with ${patientName}`,
			start: {
				dateTime: appointmentDateTime,
				timeZone: "Pacific Standard Time",
			},
			end: {
				dateTime: endDateTime,
				timeZone: "Pacific Standard Time",
			},
			attendees: [
				{
					emailAddress: {
						address: email,
						name: patientName,
					},
					type: "required",
				},
			],
		};

		const appointmentResponse = await fetch(eventUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventBody),
		});

		if (!appointmentResponse.ok) {
			const errorData =
				(await appointmentResponse.json()) as ErrorResponse;
			console.error("Appointment creation error:", errorData);
			throw new Error(
				`Failed to create appointment: ${errorData.error?.message || "Unknown error"}`
			);
		}

		const appointmentResult =
			(await appointmentResponse.json()) as AppointmentResponse;
		return NextResponse.json(appointmentResult, { status: 200 });
	} catch (error: any) {
		console.error("Error creating appointment:", error);
		return NextResponse.json(
			{
				error: "Error creating appointment",
				details: error.message || "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
