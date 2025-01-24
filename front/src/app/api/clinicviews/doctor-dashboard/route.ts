// app/api/doctor-dashboard/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";

export async function GET(req: NextRequest) {
	try {
		const tokenResponse = await fetch(
			"http://localhost:2999/api/clinicviews/get-token/route"
		);
		if (!tokenResponse.ok) {
			throw new Error("Failed to fetch access token");
		}
		const { accessToken } = await tokenResponse.json();

		const client = Client.init({
			authProvider: (done) => {
				done(null, accessToken);
			},
		});

		const now = new Date().toISOString();
		const appointments = await client
			.api("/me/events")
			.filter(`start/dateTime ge '${now}'`)
			.select("subject,start,end,attendees")
			.orderby("start/dateTime")
			.top(10)
			.get();

		const recentContacts = await client
			.api("/me/contacts")
			.orderby("createdDateTime desc")
			.top(10)
			.get();

		return NextResponse.json(
			{
				appointments: appointments.value,
				recentRegistrations: recentContacts.value,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error fetching doctor dashboard data:", error);
		return NextResponse.json(
			{ error: "Error fetching doctor dashboard data" },
			{ status: 500 }
		);
	}
}
