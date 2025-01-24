import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const domainContext = req.cookies.get("domainContext")?.value || "unknown";
	return NextResponse.json({ domainContext });
}

export const config = {
	runtime: "edge",
};
