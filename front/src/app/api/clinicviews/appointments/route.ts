// app/api/appointment/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
	addAppointment,
	getAppointment,
} from "@/utils/clinicviews/fsclinicalsIndexedDB";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
	try {
		const { patientId, date, time } = await req.json();

		const appointment = {
			id: uuidv4(),
			patientId,
			date,
			time,
			status: "suggested" as const,
		};

		await addAppointment(appointment);

		return NextResponse.json(
			{
				message: "Appointment suggested successfully",
				appointment,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: "Error suggesting appointment",
				error: error.message || "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ message: "Appointment ID is required" },
				{ status: 400 }
			);
		}

		const appointment = await getAppointment(id);

		if (!appointment) {
			return NextResponse.json(
				{ message: "Appointment not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(appointment, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{
				message: "Error fetching appointment",
				error: error.message || "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
