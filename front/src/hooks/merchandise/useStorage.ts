"use client";

import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    db,
    projectStorage,
    timestamp,
} from "@/lib/merchandise/database/firebaseStorage";

interface StorageHookResult {
    progress: number;
    url: string | null;
    error: Error | null;
}

const useStorage = (file: File): StorageHookResult => {
    const { data: session, status } = useSession();
    const userImage = `users/${session?.id}/images/`;

    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const storageRef = ref(projectStorage, `${userImage}${file.name}`);
        const collectionRef = collection(db, userImage);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snap) => {
                let percentage =
                    (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            },
            (err) => {
                setError(err);
            },
            async () => {
                const downloadUrl = await getDownloadURL(
                    uploadTask.snapshot.ref
                );
                const createdAt = timestamp;

                await addDoc(collectionRef, {
                    url: downloadUrl,
                    createdAt,
                });
                setUrl(downloadUrl);
            }
        );
    }, [file]);

    return { progress, url, error };
};

export default useStorage;
