import type { NextApiRequest, NextApiResponse } from "next";
import {
    collection,
    query,
    getDocs,
    where,
    addDoc,
    orderBy,
} from "firebase/firestore";
import { db, timestamp } from "@/lib/merchandise/database/firebaseStorage";

interface DesignData {
    id: string;
    file: string;
    url: string;
    name: string;
    description: string;
    createdAt: typeof timestamp;
}

interface ExistingDesignStatus {
    designExistence: boolean;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const designData: DesignData = req.body;

    const { id, file, url, name, description } = designData;

    if (req.method === "POST") {
        const checkExistingDesign = query(
            collection(db, "designs"),
            where("name", "==", name)
        );

        const design: DesignData = {
            id,
            file,
            url,
            name,
            description,
            createdAt: timestamp,
        };

        const existingDesignSnapshot = await getDocs(checkExistingDesign);

        const existingDesignStatus: ExistingDesignStatus = {
            designExistence: false,
        };

        existingDesignSnapshot.forEach((designDoc) => {
            if (!designDoc.data().empty) {
                existingDesignStatus.designExistence = true;
            }
        });

        if (existingDesignStatus.designExistence) {
            return res.status(422).json({
                message:
                    "Design name already exists, please choose a different design name.",
            });
        } else {
            await addDoc(collection(db, "designs"), design);
            return res.status(201).json({
                message: `Added ${name}!`,
            });
        }
    }

    if (req.method === "GET") {
        const requestedDesigns = query(
            collection(db, "designs"),
            orderBy("createdAt", "desc")
        );

        const allDesigns = await getDocs(requestedDesigns);

        const designCollection: DesignData[] = [];

        allDesigns.forEach((designDocument) => {
            designCollection.push({
                ...designDocument.data(),
                id: designDocument.id,
            } as DesignData);
        });

        return res.status(201).json(designCollection);
    }

    if (req.method === "PUT") {
        // Handle PUT request logic here
    }

    if (req.method === "DELETE") {
        // Handle DELETE request logic here
    }
};
