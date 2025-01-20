import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { patientId, date, time } = req.body;
            const tokenResponse = await fetch(
                "http://localhost:2999/api/get-token/route"
            );
            const { accessToken } = await tokenResponse.json();
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
                throw new Error("Failed to create appointment suggestion");
            }

            res.status(201).json({
                message: "Appointment suggestion received",
            });
        } catch (error) {
            console.error("Error suggesting appointment:", error);
            res.status(500).json({ error: "Error suggesting appointment" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
