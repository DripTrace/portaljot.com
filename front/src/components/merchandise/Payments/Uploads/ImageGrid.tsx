"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useFirestore from "@/hooks/merchandise/useFirestore";

function ImageGrid({ setSelectedImg }: any) {
    const { data: session, status } = useSession();

    const userImage = `users/${session?.id}/images`;

    const { docs } = useFirestore(userImage);
    useEffect(() => {
        console.log();
    });

    return (
        <div className="img-grid">
            {docs &&
                docs.map((doc: any) => (
                    <motion.div
                        className="img-wrap"
                        key={doc.id}
                        layout
                        whileHover={{ opacity: 1 }}
                        onClick={() => setSelectedImg(doc.url)}
                    >
                        <motion.img
                            src={doc.url}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
        </div>
    );
}

export default ImageGrid;
