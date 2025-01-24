import type { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
	console.log(req);
	return res.status(200);
};
