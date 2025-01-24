import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	return NextResponse.json(
		{ success: false, error: "Cart must not be empty" },
		{ status: 200 }
	);
}
