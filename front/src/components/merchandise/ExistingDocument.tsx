"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useDocumentUpload from "@/hooks/merchandise/useDocumentUpload";

const ExistingDocument: React.FC = () => {
    const documentReader = new FileReader();
    const documentTypes = ["image/jpeg", "image/jpg", "image/png"];

    const [verificationDocument, setVerificationDocument] = useState<
        string | null
    >(null);
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [submitDocumentFile, setSubmitDocumentFile] = useState<File | null>(
        null
    );
    const [documentSubmitError, setDocumentSubmitError] = useState<string>("");
    const [documentDimensions, setDocumentDimensions] = useState({
        width: 0,
        height: 0,
    });

    const getImageDimensions = (
        url: string
    ): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () =>
                resolve({
                    width: img.width,
                    height: img.height,
                });
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    };

    const loadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const selectedDocument = e.target.files ? e.target.files[0] : null;

        if (selectedDocument) {
            setDocumentFile(selectedDocument);

            documentReader.readAsDataURL(selectedDocument);

            documentReader.onload = async (loaded) => {
                const documentText = loaded?.target?.result;

                if (documentText && typeof documentText === "string") {
                    try {
                        const { width, height } =
                            await getImageDimensions(documentText);
                        console.log(
                            `Image dimensions: ${width}px x ${height}px`
                        );
                        setDocumentDimensions({ width, height });
                    } catch (e) {
                        console.error(e);
                    }
                    setVerificationDocument(documentText);
                }
            };
        }
    };

    const submitDocument = (e: React.FormEvent) => {
        e.preventDefault();

        if (documentFile && documentTypes.includes(documentFile.type)) {
            setSubmitDocumentFile(documentFile);
            console.log({ submitting: documentFile.name });
        } else {
            setSubmitDocumentFile(null);
            setDocumentSubmitError("Please select a .jpeg, .jpg or .png image");
        }
    };

    useEffect(() => {
        if (!verificationDocument) {
            console.log("no file selected");
        } else {
            console.log(verificationDocument);
        }
    }, [verificationDocument]);

    return (
        <div className="relative h-[100%] w-[100%] overflow-hidden flex flex-col items-center justify-center">
            <form
                className="h-[100%] w-[100%] flex items-center justify-center"
                onSubmit={submitDocument}
            >
                <input
                    className="flex-1"
                    type="file"
                    name="document"
                    id="document_file"
                    onChange={loadDocument}
                />
                <div className="glass-container h-[25rem] w-[37.5rem] flex items-center justify-center">
                    {verificationDocument && (
                        <img
                            className="h-full w-full border rounded-[0.625rem] object-contain"
                            src={verificationDocument}
                            alt="Verification Document"
                        />
                    )}
                </div>

                <input
                    className="hidden"
                    name="document_input"
                    id="document_submit"
                    type="submit"
                />
                <label className="cursor-pointer" htmlFor="document_submit">
                    Upload Verification Document
                </label>
            </form>
            <div className="svg-output-container">
                {documentSubmitError && (
                    <div className="error">{documentSubmitError}</div>
                )}
                {submitDocumentFile && <div>{submitDocumentFile.name}</div>}
                {submitDocumentFile && verificationDocument && (
                    <DocumentProgress
                        submitDocumentFile={submitDocumentFile}
                        setSubmitDocumentFile={setSubmitDocumentFile}
                        verificationDocument={verificationDocument}
                    />
                )}
            </div>
        </div>
    );
};

export default ExistingDocument;

interface DocumentProgressProps {
    submitDocumentFile: File;
    setSubmitDocumentFile: React.Dispatch<React.SetStateAction<File | null>>;
    verificationDocument: string;
}

export const DocumentProgress: React.FC<DocumentProgressProps> = ({
    submitDocumentFile,
    setSubmitDocumentFile,
    verificationDocument,
}) => {
    const { progress, url } = useDocumentUpload(
        submitDocumentFile,
        verificationDocument
    );

    useEffect(() => {
        if (url) {
            setSubmitDocumentFile(null);
        }
    }, [url, setSubmitDocumentFile]);

    return (
        <motion.div
            className="firebase-progress"
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}
        ></motion.div>
    );
};
