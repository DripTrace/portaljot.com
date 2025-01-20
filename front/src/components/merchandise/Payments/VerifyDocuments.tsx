"use client";

import axios from "axios";
import { useSession, SessionContextValue } from "next-auth/react";
import { useEffect, useState } from "react";
import ImageGrid from "./Uploads/ImageGrid";
import Modal from "./Uploads/Modal";
import Title from "./Uploads/Title";
import UploadForm from "./Uploads/UploadForm";

interface ExtendedSession {
    id?: string;
    user?: {
        stripeId?: string;
        personId?: string;
    };
}

function VerifyDocuments() {
    const { data: session, status } = useSession() as SessionContextValue & {
        data: ExtendedSession | null;
    };
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    console.log("Session data:", session);
    console.log("Selected image URL:", selectedImg);

    const uploadingDocuments = async () => {
        if (!selectedImg || !session) return;

        try {
            await axios.post("/api/merchandise/stripe/upload-verification", {
                firebaseID: session.id,
                stripeId: session.user?.stripeId,
                personId: session.user?.personId,
                documentUploadUrl: selectedImg,
            });
        } catch (errors) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (selectedImg) {
            uploadingDocuments();
            console.log("Uploading document with image:", selectedImg);
        }
    }, [selectedImg]);

    return (
        <div className="App">
            <Title />
            <UploadForm />
            <ImageGrid setSelectedImg={setSelectedImg} />
            {selectedImg && (
                <Modal
                    onClick={uploadingDocuments}
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                />
            )}
        </div>
    );
}

export default VerifyDocuments;
