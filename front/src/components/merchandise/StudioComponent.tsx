"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Studio from "@/components/merchandise/Studio";
import SvgGrid from "@/components/merchandise/Payments/Uploads/SvgGrid";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { fetchDesigns } from "@/actions/merchandise/fetchDesigns";

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will find a plethora of custom graphic designs attached to high-quality merchandise.";

const StudioComponent = () => {
    const [designs, setDesigns] = useState<any[]>([]);
    const [selectedImg, setSelectedImg] = useState<string | null>(null); // State to handle selected image

    useEffect(() => {
        async function loadDesigns() {
            try {
                const retrievedDesigns = await fetchDesigns();
                setDesigns(retrievedDesigns);
            } catch (error) {
                console.error("Error fetching designs:", error);
            }
        }

        loadDesigns();
    }, []);

    return (
        <ContentComponent title="Studio" description={`${title} - ${subtitle}`}>
            <Studio />
            <SvgGrid designs={designs} setSelectedImg={setSelectedImg} />{" "}
            {/* Pass setSelectedImg as prop */}
            <div className="svg-grid">
                {designs.map((design) => (
                    <motion.div
                        className="svg-wrap"
                        key={design.id}
                        layout
                        whileHover={{ opacity: 1 }}
                    >
                        <motion.img
                            className="svgs"
                            src={design.url}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
            </div>
        </ContentComponent>
    );
};

export default StudioComponent;
