"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
    resetCameraImage,
    selectCameraImage,
} from "@/lib/merchandise/state/slices/cameraSlice";
import {
    db,
    projectStorage,
    timestamp,
} from "@/lib/merchandise/database/firebaseStorage";
import ContentComponent from "./ContentComponent";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust the import path as needed

const Preview = () => {
    const id = uuid();
    const { data: session, status } = useSession();

    const cameraImage = useSelector(selectCameraImage);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadSession = async () => {
            await checkSession();
        };
        loadSession();
    }, []);

    useEffect(() => {
        if (!cameraImage) {
            router.replace(
                "/merchandise/routes/protected/creator/webcam-capture"
            );
        }
    }, [cameraImage, router]);

    const closePreview = () => {
        dispatch(resetCameraImage());
    };

    const sendPost = () => {
        if (!session?.user?.obinsunId) return;

        const capturedImage = `users/${session.user.obinsunId}/documents/`;
        const imageRef = ref(projectStorage, `${capturedImage}${id}.png`);

        const capturedImageRef = collection(db, capturedImage);

        uploadString(imageRef, cameraImage, "data_url").then((snapshot) => {
            const getUrl = async () => {
                const imageUrl = await getDownloadURL(snapshot.ref);
                const createdAt = timestamp;

                await addDoc(capturedImageRef, {
                    imageUrl,
                    read: false,
                    createdAt,
                    username: session.user?.username || "Anonymous",
                });
            };

            getUrl();
            router.replace("/merchandise/routes/protected/creator/documents");
        });
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.replace("/merchandise");
        return null;
    }

    return (
        <ContentComponent title="" description="">
            <div className="relative">
                <CloseIcon
                    onClick={closePreview}
                    className="absolute top-0 left-0 margin-[5px] cursor-pointer z-50 glass-container"
                />
                <img
                    src={cameraImage}
                    alt=""
                    className="glass-container h-full w-full"
                />
                <div
                    onClick={sendPost}
                    className="absolute bottom-0 right-0 glass-container flex justify-center items-center border-[1rem] p-[1rem] cursor-pointer"
                >
                    <h2>Save</h2>
                    <SendIcon fontSize="small" className="text-large" />
                </div>
            </div>
        </ContentComponent>
    );
};

export default Preview;
