// app/api/rooms/[roomId]/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function GET(
	req: NextRequest,
	{ params }: { params: { roomId: string } }
) {
	try {
		const members = await prisma.membership.findMany({
			where: { docId: params.roomId },
			select: {
				userId: true,
				role: true,
			},
		});
		return NextResponse.json(members, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching room members:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
