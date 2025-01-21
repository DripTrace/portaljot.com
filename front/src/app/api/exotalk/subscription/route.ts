// app/api/exotalk/subscription/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) {
			return NextResponse.json(
				{ error: "Missing userId" },
				{ status: 400 }
			);
		}

		const subscription = await prisma.subscription.findUnique({
			where: { userId },
		});

		if (!subscription) {
			return NextResponse.json({ subscription: null }, { status: 200 });
		}

		return NextResponse.json({ subscription }, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching subscription:", error);
		return NextResponse.json(
			{ error: error.message || "Internal server error" },
			{ status: 500 }
		);
	}
}
