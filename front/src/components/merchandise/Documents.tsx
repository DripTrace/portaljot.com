"use client";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { db } from "@/lib/merchandise/database/firebaseStorage";
import { resetCameraImage } from "@/lib/merchandise/state/slices/cameraSlice";
import CapturedDocuments from "@/components/merchandise/Payments/Uploads/CapturedDocuments";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { checkSession } from "@/actions/merchandise/checkSession";
import { ExtendedSession } from "@/types/merchandise/ExtendedSession";

type Document = {
    id: string;
    createdAt: FirebaseFirestore.Timestamp;
    imageUrl: string;
    read: boolean;
};

const Documents: React.FC = () => {
    const { data, status } = useSession(); // Removed the <ExtendedSession> type
    const session = data as ExtendedSession; // Cast data to ExtendedSession
    const [documents, setDocuments] = useState<Document[]>([]);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const loadSession = async () => {
            await checkSession();
        };
        loadSession();
    }, []);

    useEffect(() => {
        if (session?.user?.obinsunId) {
            const capturedDocument = `users/${session.user.obinsunId}/documents`;
            const imageReference = collection(db, capturedDocument);
            const documentQuery = query(
                imageReference,
                orderBy("createdAt", "desc")
            );

            const unsubscribe = onSnapshot(documentQuery, (snap) => {
                const docs: Document[] = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Document, "id">),
                }));
                setDocuments(docs);
            });

            return () => unsubscribe();
        }
    }, [session]);

    const takeSnap = () => {
        dispatch(resetCameraImage());
        router.push("/merchandise/routes/protected/creator/webcam-capture");
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.replace("/merchandise");
        return null;
    }

    return (
        <ContentComponent
            title="Captured Documents"
            description="View and manage your captured documents"
        >
            <div className="relative">
                <div className="h-full w-full glass-container">
                    {documents.map((doc) => (
                        <CapturedDocuments
                            key={doc.id}
                            id={doc.id}
                            timestamp={doc.createdAt}
                            imageUrl={doc.imageUrl}
                            read={doc.read}
                        />
                    ))}
                </div>

                <RadioButtonUncheckedIcon
                    className="hover:opacity-[0.8] cursor-pointer"
                    onClick={takeSnap}
                    fontSize="large"
                />
            </div>
        </ContentComponent>
    );
};

export default Documents;
