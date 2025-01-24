import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
	try {
		const designData: DesignData = await req.json();
		const { id, file, url, name, description } = designData;

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
			return NextResponse.json(
				{
					message:
						"Design name already exists, please choose a different design name.",
				},
				{ status: 422 }
			);
		}

		await addDoc(collection(db, "designs"), design);
		return NextResponse.json(
			{ message: `Added ${name}!` },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json(
			{
				error: "Failed to add design",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
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

		return NextResponse.json(designCollection, { status: 200 });
	} catch (error) {
		console.error("Error in GET handler:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch designs",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}

export async function handler(req: NextRequest) {
	try {
		switch (req.method) {
			case "POST":
				return await POST(req);
			case "GET":
				return await GET();
			default:
				return NextResponse.json(
					{ error: `Method ${req.method} Not Allowed` },
					{
						status: 405,
						headers: { Allow: "GET, POST" },
					}
				);
		}
	} catch (e) {
		console.error("Error in handler:", e);
		return NextResponse.json(
			{
				error: "Internal Server Error",
				details: e instanceof Error ? e.message : String(e),
			},
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
