"use client";
import useSWR from "swr";
import { useAuth } from "@/components/dashboard/authProvider";
import WaitlistForm from "./waitlists/forms";
import { ThemeToggleButton } from "@/components/dashboard/themeToggleButton";
// import { useAuth } from '@/components/authProvider';
// import { ThemeToggleButton } from '@/components/themeToggleButton';
// import WaitlistForm from './waitlists/forms';

// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = (...args: [RequestInfo, RequestInit?]) =>
	fetch(...args).then((res) => res.json());

export default function Home() {
	const auth = useAuth();
	const { data, error, isLoading } = useSWR("/api/dashboard/hello", fetcher);
	console.log("error: ", error, "isLoading: ", isLoading);
	// if (error) return <div>failed to load</div>
	// if (isLoading) return <div>loading...</div>

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>{data && data.apiEndpoint}</div>
			<div>
				<WaitlistForm />
			</div>
			<div>{auth.isAuthenticated ? "Hello user" : "Hello guest"}</div>
			<div>
				<ThemeToggleButton />
			</div>
		</main>
	);
}
