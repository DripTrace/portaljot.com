import { NextApiRequest, NextApiResponse } from "next";
import { addPatient, getPatient } from "@/utils/fsclinicalsIndexedDB";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { name, email, phone } = req.body;
            const patient = {
                id: uuidv4(),
                name,
                email,
                phone,
            };
            await addPatient(patient);
            res.status(201).json({
                message: "Patient registered successfully",
                patient,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error registering patient",
                error,
            });
        }
    } else if (req.method === "GET") {
        try {
            const { id } = req.query;
            if (typeof id !== "string") {
                return res.status(400).json({ message: "Invalid patient ID" });
            }
            const patient = await getPatient(id);
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ message: "Error fetching patient", error });
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
