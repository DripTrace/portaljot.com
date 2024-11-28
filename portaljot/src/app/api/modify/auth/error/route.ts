// import { NextRequest, NextResponse } from "next/server";

// const error = async (req: NextRequest) => {
// 	console.log("ERROR RETRIEVING SESSION >>> ", req.body);
// 	const errorQuery = req.nextUrl.searchParams.get("error");

// 	return new NextResponse(JSON.stringify({ error: errorQuery }), {
// 		status: 200,
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// };

// export default error;

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const error = searchParams.get("error");

	let errorMessage = "An unknown error occurred";
	let statusCode = 400;

	switch (error) {
		case "OAuthAccountNotLinked":
			errorMessage =
				"This account is already associated with another user. Please sign in with a different method.";
			statusCode = 409; // Conflict
			break;
		case "EmailSignin":
			errorMessage = "The email signin link is invalid or has expired.";
			statusCode = 400; // Bad Request
			break;
		case "CredentialsSignin":
			errorMessage = "The provided credentials are invalid.";
			statusCode = 401; // Unauthorized
			break;
		// Add more error cases as needed
	}

	return NextResponse.json({ error: errorMessage }, { status: statusCode });
}

// If you need to handle other HTTP methods, you can add them like this:
// export async function POST(request: NextRequest) {
//   // Handle POST requests
// }

// export async function PUT(request: NextRequest) {
//   // Handle PUT requests
// }

// export async function DELETE(request: NextRequest) {
//   // Handle DELETE requests
// }
