import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { accessToken, patientName, email, appointmentDateTime } = req.body;

    if (!accessToken || !patientName || !email || !appointmentDateTime) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const eventUrl = `https://graph.microsoft.com/v1.0/users/fsclinicals-com@mail.clinicviews.com/calendar/events`;

    try {
        const appointmentResponse = await fetch(eventUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subject: `Appointment with ${patientName}`,
                start: {
                    dateTime: appointmentDateTime,
                    timeZone: "Pacific Standard Time",
                },
                end: {
                    dateTime: new Date(
                        new Date(appointmentDateTime).getTime() + 60 * 60 * 1000
                    ).toISOString(),
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
            }),
        });

        if (!appointmentResponse.ok) {
            const errorData =
                (await appointmentResponse.json()) as ErrorResponse;
            console.error("Appointment creation error:", errorData);
            throw new Error(
                `Failed to create appointment: ${
                    errorData.error?.message || "Unknown error"
                }`
            );
        }

        const appointmentResult =
            (await appointmentResponse.json()) as AppointmentResponse;
        res.status(200).json(appointmentResult);
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({
            error: "Error creating appointment",
            details: (error as Error).message,
        });
    }
}
