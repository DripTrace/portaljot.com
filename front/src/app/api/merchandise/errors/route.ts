import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
	if (req.method === "POST") {
		console.log(req.body);

		res.send(req.body);
	}
};
