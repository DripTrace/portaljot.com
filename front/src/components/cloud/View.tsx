"use client";

import { useEffect, useState } from "react";
import { parse } from "flatted";
import ASCIITree from "./ASCIITree";
// import ASCIITreeVariation from "./ASCIITreeVariation";

const View = ({ initialData }: { initialData: any }) => {
    const [data, setData] = useState<any>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}api/cloud/view/cloud-view`
                );
                const result = await response.json();
                if (response.ok) {
                    const parsedData = parse(result.data);
                    console.log("Fetched cloud data:", parsedData);
                    setData(parsedData);
                } else {
                    setError(result.error || "Unknown error");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        if (!data) {
            fetchData();
        }
    }, [data]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
                Cloud Infrastructure Dashboard
            </h1>
            {data && <ASCIITree data={data} />}
            {/* {data && <ASCIITreeVariation data={data} />} */}
        </div>
    );
};

export default View;
