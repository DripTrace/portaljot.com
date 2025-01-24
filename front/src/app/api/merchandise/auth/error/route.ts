import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
	console.log("ERROR RETRIEVING SESSION >>> ", req.body);
	const errorQuery = req.query.error;

	res.status(200).send({ error: errorQuery });
};
