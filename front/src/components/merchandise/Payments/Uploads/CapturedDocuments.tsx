"use client";

import { collection, doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import ReactTimeago from "react-timeago";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { selectImage } from "@/lib/merchandise/state/slices/snapSlice";
import { db } from "@/lib/merchandise/database/firebaseStorage";
const CapturedDocuments = ({ id, timestamp, read, imageUrl }: any) => {
    const { data: session, status } = useSession();

    const dispatch = useDispatch();
    const router = useRouter();

    const capturedImageRef = `users/${session?.id}/documents`;

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));

            const imageReference = collection(db, capturedImageRef);

            setDoc(doc(imageReference, id), { read: true, merge: true });

            router.push("/merchandise/routes/protected/creator/document-view");
        }
    };

    return (
        <>
            <div
                onClick={open}
                className="flex items-center space-between p-[8px] border-b-[1px_solid_whitesmoke] cursor-pointer"
            >
                <div className="left-[5px] flex-1">
                    <p>
                        {!read && "Tap to view -"}{" "}
                        <ReactTimeago
                            date={new Date(timestamp?.toDate()).toUTCString()}
                        />
                    </p>
                </div>

                {!read && <StopRoundedIcon className="text-red-500" />}
            </div>
        </>
    );
};

export default CapturedDocuments;
