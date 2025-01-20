"use client";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    StorageError,
} from "firebase/storage";
import { useState, useEffect } from "react";
import {
    projectStorage,
    timestamp,
} from "@/lib/merchandise/database/firebaseStorage";
import { v4 as uuidv4 } from "uuid";

const useSvgUpload = (
    file: File | null,
    designName: string,
    designDescription: string
) => {
    console.log({ firestoreUpload: file });
    const userImage = "designs/";

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<StorageError | null>(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!file) return;

        let transformedName = designName.replace(" ", "_").toLowerCase();

        const metadata = {
            customMetadata: {
                name: transformedName,
                description: designDescription,
            },
        };

        const changedFileName = file.name.replace(" ", "_");

        console.log({ svgFile: { file } });
        const storageRef = ref(
            projectStorage,
            `${userImage}${changedFileName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            "state_changed",
            (snap) => {
                let percentage =
                    (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            },
            (err: StorageError) => {
                setError(err);
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                const createdAt = timestamp;
                const createUuid = uuidv4();
                const obinsunUuid = `0b!n$un_${createUuid}`;
                const designAddition = {
                    id: obinsunUuid,
                    url,
                    createdAt,
                    name: metadata.customMetadata.name,
                    description: metadata.customMetadata.description,
                };

                const addDesign = {
                    method: "POST",
                    body: JSON.stringify(designAddition),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                await fetch(
                    `${process.env.MERCH_API}/design/${designAddition.name}`,
                    addDesign
                )
                    .then((res) => res.json())
                    .then((data) => console.log(data));

                setUrl(url);
            }
        );
    }, [file, designName, designDescription]);

    return { progress, url, error };
};

export default useSvgUpload;
