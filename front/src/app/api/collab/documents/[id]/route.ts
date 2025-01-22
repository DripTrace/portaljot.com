// app/api/documents/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma"; // Adjust path to your Prisma client

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const document = await prisma.document.findUnique({
			where: { id: params.id },
			select: { id: true, title: true },
		});
		if (!document) {
			return NextResponse.json(
				{ error: "Document not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(document, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching document:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await req.json();
		const { title } = body;

		// Update the document title
		const updated = await prisma.document.update({
			where: { id: params.id },
			data: { title },
		});

		return NextResponse.json(updated, { status: 200 });
	} catch (error: any) {
		console.error("Error updating document:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
