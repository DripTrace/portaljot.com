// import { NextRequest, NextResponse } from "next/server";
// import { gql } from "@apollo/client";
// import { serverClient } from "@/lib/server/serverClient";

// export const dynamic = "force-dynamic";

// const corsHeaders = {
// 	"Access-Control-Allow-Origin": "*",
// 	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
// 	"Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function POST(request: NextRequest) {
// 	const { query, variables } = await request.json();
// 	console.log("QUERY >>>", query);
// 	console.log("VARIABLES >>>", variables);

// 	try {
// 		let result;

// 		// Check if the query is a mutation or a query
// 		if (query.trim().startsWith("mutation")) {
// 			result = await serverClient.mutate({
// 				mutation: gql`
// 					${query}
// 				`,
// 				variables,
// 			});
// 		} else {
// 			result = await serverClient.query({
// 				query: gql`
// 					${query}
// 				`,
// 				variables,
// 			});
// 		}
// 		// console.log("RESULT >>>", result.errors && result.errors[0].locations);
// 		console.log("RESULT >>>", result);
// 		const data = result.data;
// 		console.log("DATA >>>", data);

// 		return NextResponse.json(
// 			{ data },
// 			// Resolve CORS issue
// 			{
// 				headers: corsHeaders,
// 			}
// 		);
// 	} catch (error) {
// 		console.log(error);
// 		return NextResponse.json(error, {
// 			status: 500,
// 		});
// 	}
// }

import { NextRequest, NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { serverClient } from "@/lib/server/serverClient";

export const dynamic = "force-dynamic";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
	try {
		const { query, variables } = await request.json();
		console.log("API route hit");
		console.log("QUERY >>>", query);
		console.log("VARIABLES >>>", JSON.stringify(variables, null, 2));

		let result;

		// Check if the query is a mutation or a query
		if (query.trim().startsWith("mutation")) {
			console.log("Executing mutation");
			result = await serverClient.mutate({
				mutation: gql`
					${query}
				`,
				variables,
			});
		} else {
			console.log("Executing query");
			result = await serverClient.query({
				query: gql`
					${query}
				`,
				variables,
			});
		}

		console.log("RESULT >>>", JSON.stringify(result, null, 2));

		if (result.errors) {
			console.error(
				"GraphQL Errors:",
				JSON.stringify(result.errors, null, 2)
			);
		}

		const data = result.data;
		console.log("DATA >>>", JSON.stringify(data, null, 2));

		return NextResponse.json(
			{ data },
			{
				headers: corsHeaders,
			}
		);
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{ error: "An error occurred processing the request" },
			{
				status: 500,
				headers: corsHeaders,
			}
		);
	}
}

export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}
