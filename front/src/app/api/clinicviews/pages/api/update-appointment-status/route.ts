import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";

export default async function POST(req: Request) {
    try {
        const { appointmentId, status } = await req.json();
        const tokenResponse = await fetch("/api/get-token/route");
        const { accessToken } = await tokenResponse.json();
        const client = Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            },
        });

        await client.api(`/me/events/${appointmentId}`).update({
            extensions: [
                {
                    "@odata.type": "microsoft.graph.openTypeExtension",
                    extensionName: "com.fsclinicals.appointmentstatus",
                    status: status,
                },
            ],
        });

        return NextResponse.json(
            { message: "Appointment status updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return NextResponse.json(
            { error: "Error updating appointment status" },
            { status: 500 }
        );
    }
}
