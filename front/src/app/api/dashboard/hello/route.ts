import { NextRequest, NextResponse } from "next/server";
import { DJANGO_API_ENDPOINT } from "@/lib/config/defaults";

export async function GET(request: NextRequest) {
	console.log("request: ", request);
	const data = { apiEndpoint: DJANGO_API_ENDPOINT };
	return NextResponse.json(data, { status: 200 });
}
