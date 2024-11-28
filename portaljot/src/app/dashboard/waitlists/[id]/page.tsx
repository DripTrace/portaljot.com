"use client";

import useSWR from "swr";
import { WaitlistCard } from "../card";
import fetcher from "@/lib/fetcher";

interface PageProps {
	params: {
		id: string;
	};
}

export default function Page({ params }: PageProps) {
	const lookupId = params ? params.id : "0";
	const { data, error, isLoading } = useSWR(
		`/api/dashboard/waitlists/${lookupId}`,
		fetcher
	);

	console.log(data, error, isLoading);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{isLoading ? (
				<div>Loading</div>
			) : (
				<WaitlistCard waitlistEvent={data} />
			)}
		</main>
	);
}
