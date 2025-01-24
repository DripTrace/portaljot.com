// app/api/user/language/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma"; // Adjust path to your Prisma client
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust path to your NextAuth config

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const userId = session.user.id;
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				secondLanguage: true,
				hasSelectedSecondLanguage: true,
				availableLanguages: true,
				// any other fields you want
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error: any) {
		console.error("GET /api/user/language error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const userId = session.user.id;
		const body = await req.json();
		const {
			secondLanguage,
			hasSelectedSecondLanguage,
			availableLanguages,
		} = body;

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				secondLanguage,
				hasSelectedSecondLanguage,
				availableLanguages,
				lastUpdated: new Date().toISOString(),
			},
			select: {
				secondLanguage: true,
				hasSelectedSecondLanguage: true,
				availableLanguages: true,
			},
		});

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error: any) {
		console.error("PATCH /api/exotalk/user/language error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
