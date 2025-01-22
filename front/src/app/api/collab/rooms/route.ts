// app/api/rooms/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const userEmail = searchParams.get("userEmail");
		if (!userEmail) {
			return NextResponse.json(
				{ error: "Missing userEmail" },
				{ status: 400 }
			);
		}
		// Fetch membership records for the given user email.
		// We assume the Membership model includes a field `userId` which is equal to the user's email.
		const memberships = await prisma.membership.findMany({
			where: { userId: userEmail },
			select: {
				id: true,
				role: true,
				docId: true,
				// Retrieve associated document information if needed.
				document: {
					select: {
						title: true,
						createdAt: true,
					},
				},
			},
		});
		return NextResponse.json(memberships, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching memberships:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
