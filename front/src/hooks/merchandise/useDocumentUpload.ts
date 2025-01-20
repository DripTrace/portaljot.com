"use client";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    UploadMetadata,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    projectStorage,
    timestamp,
} from "@/lib/merchandise/database/firebaseStorage";
import { v4 as uuidv4 } from "uuid";

// Custom metadata structure should have string values
interface CustomMetadata {
    documentName: string;
    documentDescription: string;
}

const useDocumentUpload = (
    submitDocumentFile: File,
    verificationDocument: string
) => {
    const { data: session } = useSession() as {
        data: { user?: { stripeId?: string }; id?: string } | null;
    };
    const userDocument = `users/${session?.id}/documents/`;

    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        console.log(submitDocumentFile);
        const documentFileEdit = submitDocumentFile.name
            ?.replace(" ", "_")
            .toLowerCase();

        const metadata: UploadMetadata = {
            customMetadata: {
                documentName: "verification_document",
                documentDescription: "neccessary document for payouts",
            },
        };

        const storageRef = ref(
            projectStorage,
            `${userDocument}${documentFileEdit}`
        );

        const uploadTask = uploadBytesResumable(
            storageRef,
            submitDocumentFile,
            metadata
        );

        uploadTask.on(
            "state_changed",
            (snap) => {
                let percentage =
                    (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            },
            (err) => {
                setError(err as Error);
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                const createdAt = timestamp;
                const createUuid = uuidv4();
                const obinsunUuid = `0b!n$un_${createUuid}`;

                const documentAddition = {
                    id: obinsunUuid,
                    documentUrl: url,
                    documentCreationDate: createdAt,
                    documentName: metadata.customMetadata?.documentName,
                    documentDescription:
                        metadata.customMetadata?.documentDescription,
                    cameraImage: verificationDocument,
                    stripeId: session?.user?.stripeId,
                    username: session?.id,
                    documentAction: "business-tax-id",
                };

                const addDocument: RequestInit = {
                    method: "POST",
                    body: JSON.stringify(documentAddition),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                await fetch("/api/merchandise/documents", addDocument).then(
                    (res) => console.log(res)
                );

                setUrl(url);
            }
        );
    }, [submitDocumentFile, session, userDocument, verificationDocument]);

    return { progress, url, error };
};

export default useDocumentUpload;
