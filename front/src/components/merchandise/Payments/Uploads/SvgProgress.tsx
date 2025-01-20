"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import useSvgUpload from "@/hooks/merchandise/useSvgUpload";

function SvgProgress({
    file,
    setFile,
    designData,
    setDesignData,
    designName,
    setDesignName,
    designDescription,
    setDesignDescription,
}: any) {
    const { progress, url } = useSvgUpload(file, designName, designDescription);

    useEffect(() => {
        if (url) {
            setFile(null);
            setDesignName("");
            setDesignDescription("");
        }
    }, [url, setFile, setDesignData, setDesignName, setDesignDescription]);

    return (
        <motion.div
            className="firebase-progress"
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}
        ></motion.div>
    );
}

export default SvgProgress;
