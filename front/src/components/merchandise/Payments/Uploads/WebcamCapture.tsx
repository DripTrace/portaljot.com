"use client";

import {
    useCallback,
    useRef,
    useState,
    useEffect,
    FormEvent,
    MouseEvent,
} from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useRouter } from "next/navigation";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
    selectCameraImage,
    setCameraImage,
} from "@/lib/merchandise/state/slices/cameraSlice";
import {
    db,
    projectStorage,
    timestamp,
} from "@/lib/merchandise/database/firebaseStorage";

type VideoConstraints = {
    width: number;
    height: number;
    facingMode: string;
};

const videoConstraints: VideoConstraints = {
    width: 720,
    height: 540,
    facingMode: "user",
};

const screenshotDimensions = { width: 720, height: 540 };

export default function WebcamCapture() {
    const [captured, setCaptured] = useState<boolean>(false);

    const webcamRef = useRef<Webcam | null>(null);
    const documentRef = useRef<HTMLInputElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: session, status } = useSession();

    const cameraImage = useSelector(selectCameraImage);

    const uploadFile = (data: string, info: Record<string, any>) => {
        const blob = new Blob([data]);
        const infoBlob = new Blob([JSON.stringify(info)]);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/merchandise/documents", true);
        let formData = new FormData();
        formData.append(
            "documentVerification",
            blob,
            "document_verification.png"
        );
        formData.append("accountInfo", infoBlob, "accountInfo.json");
        xhr.onload = function () {
            console.log("File uploading completed!");
        };
        console.log("File uploading started!");
        xhr.send(formData);
    };

    const uploadDocument = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!session || !cameraImage) {
            return;
        }

        uploadFile(cameraImage, {
            stripeAccess: session.user?.stripeId,
            username: session.user?.username,
        });
    };

    const getImgURL = (url: string, callback: (blob: Blob) => void) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            callback(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    };

    const loadURLToInputField = (url: string) => {
        getImgURL(url, (imgBlob) => {
            const fileName = "verification_document.png";
            const file = new File([imgBlob], fileName, {
                type: "image/png",
                lastModified: new Date().getTime(),
            });
            const container = new DataTransfer();
            container.items.add(file);
            if (captured && pageRef.current) {
                const inputFile =
                    pageRef.current.querySelector<HTMLInputElement>(
                        "#png_file"
                    );
                if (inputFile) {
                    inputFile.files = container.files;
                    console.log(inputFile.value);
                    console.log(inputFile.files);
                }
            }
        });
    };

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc =
                webcamRef.current.getScreenshot(screenshotDimensions);
            if (imageSrc) {
                dispatch(setCameraImage(imageSrc));
                setCaptured(true);
            }
        }
    }, [dispatch]);

    const sendDocument = () => {
        if (!session || !cameraImage) {
            return;
        }

        const id = uuid();
        const capturedImage = `users/${session.id}/documents/`;
        const imageRef = ref(projectStorage, `${capturedImage}${id}.png`);
        const capturedImageRef = collection(db, capturedImage);

        uploadString(imageRef, cameraImage, "data_url").then((snapshot) => {
            const getUrl = async () => {
                const imageUrl = await getDownloadURL(snapshot.ref);
                const createdAt = timestamp;
                const documentAddition = {
                    id,
                    cameraImage,
                    createdAt,
                    documentName: "onboarding_verification",
                    description: "additional document verification",
                    username: session.user?.username,
                    stripeId: session.user?.stripeId,
                };

                const addDocument = {
                    method: "POST",
                    body: JSON.stringify(documentAddition),
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };

                await fetch("/api/merchandise/documents", addDocument).then(
                    (res) => console.log(res)
                );

                await addDoc(capturedImageRef, {
                    imageUrl,
                    read: false,
                    createdAt,
                    username: session.user?.username,
                });
            };

            getUrl();
            setCaptured(false);
        });
    };

    useEffect(() => {
        if (cameraImage) {
            loadURLToInputField(cameraImage);
        }
    }, [cameraImage, captured]);

    return (
        <div
            className="relative h-[100%] w-[100%] overflow-hidden flex items-center justify-center"
            ref={pageRef}
        >
            {!captured ? (
                <div className="h-[100%] w-[100%] flex items-center justify-center">
                    <div className="h-[25rem] w-[37.5rem] flex items-center justify-center">
                        <Webcam
                            audio={false}
                            height={720}
                            imageSmoothing={true}
                            ref={webcamRef}
                            screenshotFormat="image/png"
                            width={1080}
                            videoConstraints={videoConstraints}
                            mirrored={true}
                            screenshotQuality={1}
                            className="glass-container object-fill flex items-center justify-center h-[100%] w-[100%]"
                        />
                    </div>
                    <RadioButtonUncheckedIcon
                        className="absolute bottom-0 left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer text-black dark:text-[#4C8EFF]"
                        onClick={capture}
                        fontSize="large"
                    />
                </div>
            ) : (
                <form className="h-[100%] w-[100%] flex items-center justify-center">
                    <CloseIcon
                        onClick={() => setCaptured(false)}
                        className="absolute top-0 left-0 margin-[5px] cursor-pointer z-50 glass-container"
                    />
                    <div className="glass-container h-[25rem] w-[37.5rem] flex items-center justify-center">
                        <Image
                            height={720}
                            width={1080}
                            src={cameraImage || ""}
                            alt=""
                            className="glass-container object-fill flex items-center justify-center h-[100%] w-[100%]"
                        />
                    </div>
                    <div
                        onClick={sendDocument}
                        className="absolute bottom-0 right-0 glass-container flex justify-center items-center p-[1rem] cursor-pointer"
                    >
                        <h2>Save</h2>
                        <SendIcon fontSize="small" className="text-large" />
                    </div>
                    <input
                        className="flex-1"
                        name="png"
                        id="png_file"
                        type="file"
                        accept=".png"
                        ref={documentRef}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            console.log(e.target.value);
                        }}
                        disabled
                        title="Upload your PNG document"
                    />
                    <input type="submit" value="upload document" />
                    <button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            uploadDocument(e);
                        }}
                    >
                        Upload Document
                    </button>
                </form>
            )}
        </div>
    );
}
