import NotFound from "@/app/not-found";
import { createElement } from "react";
// import { renderToString } from "react-dom/server";

// import { renderToString } from "next/dist/compiled/react-dom/server-rendering-stub";

export async function GET() {
	const { renderToString } = (await import("react-dom/server")).default;

	const html = renderToString(createElement(NotFound));
	return new Response(html, {
		headers: {
			"Content-Type": "text/html",
		},
	});
}
