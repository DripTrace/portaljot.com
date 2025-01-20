import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";

export default async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("id");

    if (!patientId) {
        return NextResponse.json(
            { error: "Patient ID is required" },
            { status: 400 }
        );
    }

    try {
        const tokenResponse = await fetch("/api/get-token/route");
        const { accessToken } = await tokenResponse.json();
        const client = Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            },
        });
        const patient = await client
            .api(`/me/contacts/${patientId}`)
            .select(
                "id,displayName,emailAddresses,mobilePhone,birthday,addresses"
            )
            .get();

        const appointments = await client
            .api("/me/events")
            .filter(
                `attendees/any(a:a/emailAddress/address eq '${patient.emailAddresses[0].address}')`
            )
            .select("subject,start,end")
            .orderby("start/dateTime desc")
            .top(5)
            .get();

        return NextResponse.json(
            { patient, appointments: appointments.value },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching patient details:", error);
        return NextResponse.json(
            { error: "Error fetching patient details" },
            { status: 500 }
        );
    }
}
