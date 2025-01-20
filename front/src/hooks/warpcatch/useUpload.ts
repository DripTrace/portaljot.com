"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { generateEmbeddings } from "@/actions/generateEmbeddings";

export enum StatusText {
	UPLOADING = "Uploading file . . .",
	UPLOADED = "File uploaded successfully",
	SAVING = "Saving file to database . . .",
	GENERATING = "Generating AI Embeddings, this will only take a few seconds . . .",
	// DONE = "All done!",
	// ERROR = "An error occurred, please try again",
}

export type Status = StatusText[keyof StatusText];

// export interface UploadResult {
// 	progress: number | null;
// 	status: string | null;
// 	fileId: string | null;
// 	handleUpload: (file: File) => void;
// }

function useUpload() {
	const { user } = useUser();
	const router = useRouter();
	const [progress, setProgress] = useState<number | null>(null);
	const [status, setStatus] = useState<Status | null>(null);
	// const [status, setStatus] = useState<string | null>(null);
	const [fileId, setFileId] = useState<string | null>(null);
	// const [progress, setProgress] = useState<number>(0);
	// // const [status, setStatus] = useState<Status>(null);
	// const [status, setStatus] = useState<string>("");
	// const [fileId, setFileId] = useState<string>("");

	const handleUpload = async (file: File) => {
		if (!file || !user) return;

		// TODO: FREE/PRO limitations . . .

		const fileIdToUploadTo = uuidv4();

		const storageRef = ref(
			storage,
			`users/${user.id}/files/${fileIdToUploadTo}`
		);

		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setStatus(StatusText.UPLOADING);
				setProgress(percent);
			},
			(error) => {
				console.error("Error uploading file: ", error);
			},
			async () => {
				setStatus(StatusText.UPLOADED);
				const downloadUrl = await getDownloadURL(
					uploadTask.snapshot.ref
				);
				setStatus(StatusText.SAVING);
				await setDoc(
					doc(db, "users", user.id, "files", fileIdToUploadTo),
					{
						name: file.name,
						size: file.size,
						type: file.type,
						downloadUrl: downloadUrl,
						ref: uploadTask.snapshot.ref.fullPath,
						// createdAt: serverTimestamp(),
						createdAt: new Date(),
					}
				);

				setStatus(StatusText.GENERATING);
				await generateEmbeddings(fileIdToUploadTo);
				setFileId(fileIdToUploadTo);
			}
		);
	};
	return { progress, status, fileId, handleUpload };
}

export default useUpload;
