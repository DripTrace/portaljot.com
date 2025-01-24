import type { NextRequest, NextResponse } from "next/server";

type Data = {
	success: boolean;
};

export default function handler(req: NextRequest, res: NextResponse<Data>) {
	res.status(200).json({ success: true });
}
