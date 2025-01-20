// "use client";

import View from "@/components/cloud/View";
import { parse } from "flatted";

const CloudPage = async () => {
    let initialData = null;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}api/cloud/view/cloud-view`
        );
        const result = await response.json();
        if (response.ok) {
            initialData = parse(result.data);
        }

        console.log("Initial Data:", initialData);
    } catch (error) {
        console.error("Error fetching initial data:", error);
    }

    return (
        <>
            <View initialData={initialData} />
            {/* cloud page */}
        </>
    );
};

export default CloudPage;
