import { NextApiRequest, NextApiResponse } from "next";
import { addAppointment, getAppointment } from "@/utils/fsclinicalsIndexedDB";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { patientId, date, time } = req.body;
            const appointment = {
                id: uuidv4(),
                patientId,
                date,
                time,
                status: "suggested" as const,
            };
            await addAppointment(appointment);
            res.status(201).json({
                message: "Appointment suggested successfully",
                appointment,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error suggesting appointment",
                error,
            });
        }
    } else if (req.method === "GET") {
        try {
            const { id } = req.query;
            if (typeof id !== "string") {
                return res
                    .status(400)
                    .json({ message: "Invalid appointment ID" });
            }
            const appointment = await getAppointment(id);
            if (!appointment) {
                return res
                    .status(404)
                    .json({ message: "Appointment not found" });
            }
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching appointment",
                error,
            });
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
