"use client";

import { useState, useEffect } from "react";
import Modal from "./Uploads/Modal";
import SelectSvg from "./Uploads/SelectSvg";
import SvgGrid from "./Uploads/SvgGrid";
import Title from "./Uploads/Title";

interface Design {
    id: string;
    url: string;
    // Add other fields if necessary
}

function UploadSvg() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [designs, setDesigns] = useState<Design[]>([]); // State for designs

    useEffect(() => {
        // Fetch or load your designs here
        // For example, fetch from an API or use hardcoded data
        const fetchDesigns = async () => {
            // Example of fetching designs
            const response = await fetch("/api/designs"); // Replace with your API endpoint
            const data = await response.json();
            setDesigns(data);
        };

        fetchDesigns();
    }, []);

    return (
        <div className="svg-container">
            <Title />
            <SelectSvg />
            <SvgGrid designs={designs} setSelectedImg={setSelectedImg} />{" "}
            {/* Pass designs prop */}
            {selectedImg && (
                <Modal
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                />
            )}
        </div>
    );
}

export default UploadSvg;
