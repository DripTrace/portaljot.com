// app/vpn/TrueNASConfig.tsx
"use client";

import { getTrueNASConfig } from "@/utils/trunasClient";
import { useState } from "react";
// import { getTrueNASConfig } from '../actions/getTrueNASConfig'

type TrueNASConfigProps = {
	result: Awaited<ReturnType<typeof getTrueNASConfig>>;
};

export default function TrueNASConfig({
	result: initialResult,
}: TrueNASConfigProps) {
	const [result, setResult] = useState(initialResult);
	const [loading, setLoading] = useState(false);

	const handleRefresh = async () => {
		setLoading(true);
		const newResult = await getTrueNASConfig();
		setResult(newResult);
		setLoading(false);
	};

	return (
		<div>
			{loading && <p>Loading...</p>}
			{result ? (
				<div>
					<h3>System Info</h3>
					<pre>{JSON.stringify(result.systemInfo, null, 2)}</pre>

					<h3>Pools</h3>
					{result.pools.map((pool: any, index: number) => (
						<div key={index}>
							<p>Name: {pool.name}</p>
							<p>Status: {pool.status}</p>
							<p>
								Size:{" "}
								{(pool.size / (1024 * 1024 * 1024)).toFixed(2)}{" "}
								GB
							</p>
						</div>
					))}
				</div>
			) : (
				<p>No TrueNAS data available</p>
			)}
			<button onClick={handleRefresh} disabled={loading}>
				Refresh Config
			</button>
		</div>
	);
}
