import { check } from "@/utils/merchandise/rate-limiting/bucket";
import { NextRequest, NextResponse } from "next/server";

export default async (_req: NextRequest, res: NextResponse) => {
	const { allowed, remaining } = await check("abcd");
	res.status(200).json({ allowed, remaining });
};
