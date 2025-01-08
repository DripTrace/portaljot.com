// app/modify/home/media/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
// import { TMedia } from "@/types/media";
import { withAuth } from "@/hooks/modify/withAuth";
import { Session } from "next-auth";
import { MediaCard, TMedia } from "@/components/modify/Media";
// import { MediaCard } from "@/components/MediaCard";

type WithAuthProps = {
	session: Session & {
		user: {
			refreshToken?: {
				access: string;
				refresh: string;
			};
		};
	};
	loading: boolean;
};

type CacheData = {
	media: TMedia[];
	totalItems: number | null;
	timestamp: number;
};

const ITEMS_PER_PAGE = 25;
const CACHE_TTL = 300000;
const POLLING_INTERVAL = 100000;

const MediaPage = (props: Record<string, any>) => {
	const { session, loading } = props as WithAuthProps;
	const [media, setMedia] = useState<TMedia[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [totalItems, setTotalItems] = useState<number | null>(null);
	const cacheRef = useRef<Record<number, CacheData>>({});

	const token = session?.user?.refreshToken?.access;

	useEffect(() => {
		if (!token) return;

		const fetchMedia = async () => {
			const cacheKey = currentPage;
			const cachedData = cacheRef.current[cacheKey];
			const now = Date.now();

			if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
				setMedia(cachedData.media);
				setTotalItems(cachedData.totalItems);
				return;
			}

			setFetching(true);
			setError(null);

			try {
				let response = await fetch(
					`http://127.0.0.1:8001/api/posts/?limit=${ITEMS_PER_PAGE}&offset=${
						(currentPage - 1) * ITEMS_PER_PAGE
					}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
						credentials: "include",
					}
				);

				if (response.status === 401) {
					const refreshResponse = await fetch(
						"http://127.0.0.1:8001/api/auth/token/refresh/",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							credentials: "include",
							body: JSON.stringify({
								refresh: session?.user?.refreshToken?.refresh,
							}),
						}
					);

					if (refreshResponse.ok) {
						const newTokens = await refreshResponse.json();
						response = await fetch(
							`http://127.0.0.1:8001/api/posts/?limit=${ITEMS_PER_PAGE}&offset=${
								(currentPage - 1) * ITEMS_PER_PAGE
							}`,
							{
								headers: {
									Authorization: `Bearer ${newTokens.access}`,
									"Content-Type": "application/json",
								},
								credentials: "include",
							}
						);
					}
				}

				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.error ||
							data.detail ||
							`HTTP error! status: ${response.status}`
					);
				}

				const mediaItems = data.results.map((item: any) => ({
					...item,
					type: item.type || "post",
					id:
						item.id ||
						item.postId ||
						`${Date.now()}-${Math.random()}`,
				}));

				cacheRef.current[cacheKey] = {
					media: mediaItems,
					totalItems: data.count,
					timestamp: now,
				};

				setMedia(mediaItems);
				setTotalItems(data.count);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Failed to fetch media"
				);
			} finally {
				setFetching(false);
			}
		};

		fetchMedia();
		const intervalId = setInterval(fetchMedia, POLLING_INTERVAL);
		return () => clearInterval(intervalId);
	}, [token, currentPage, session]);

	const totalPages = totalItems ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1;

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-blue-900">
				<div className="text-white text-2xl animate-pulse">
					Loading...
				</div>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-blue-900">
				<div className="text-white text-2xl">Not authenticated</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
			<header className="flex items-center justify-between p-6 bg-gray-800 bg-opacity-50 shadow-lg">
				<h1 className="text-3xl font-bold">Media Gallery</h1>
				<Link
					href="/modify/home"
					className="text-blue-400 hover:text-blue-600 transition"
				>
					Back to Homepage
				</Link>
			</header>

			<main className="p-6">
				<div className="mb-4 text-sm text-gray-300">
					Last fetched: {new Date().toLocaleString()}
				</div>

				{error && (
					<div className="mb-4 p-4 bg-red-600 rounded shadow">
						<p className="text-white">{error}</p>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{media.map((item) => (
						<MediaCard key={item.id} item={item} />
					))}
				</div>

				<div className="flex justify-center items-center mt-8 space-x-4">
					<button
						onClick={() =>
							setCurrentPage((p) => Math.max(1, p - 1))
						}
						disabled={currentPage === 1}
						className={`px-4 py-2 rounded ${
							currentPage === 1
								? "bg-gray-700 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600"
						} transition`}
					>
						Previous
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => setCurrentPage((p) => p + 1)}
						disabled={currentPage >= totalPages}
						className={`px-4 py-2 rounded ${
							currentPage >= totalPages
								? "bg-gray-700 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600"
						} transition`}
					>
						Next
					</button>
				</div>
			</main>

			<footer className="p-6 text-center text-gray-500">
				&copy; {new Date().getFullYear()} Your Company
			</footer>
		</div>
	);
};

export default withAuth(3 * 60)(MediaPage);
