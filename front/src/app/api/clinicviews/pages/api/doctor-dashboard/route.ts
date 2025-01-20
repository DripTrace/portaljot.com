import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";

export default async function GET(req: Request) {
    try {
        const tokenResponse = await fetch("/api/get-token/route");
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
    } catch (error) {
        console.error("Error fetching doctor dashboard data:", error);
        return NextResponse.json(
            { error: "Error fetching doctor dashboard data" },
            { status: 500 }
        );
    }
}
