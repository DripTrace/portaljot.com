"use server";

export async function fetchDesigns() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/merchandise/designs`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch designs");
	}
	const designs = await response.json();
	return designs;
}
