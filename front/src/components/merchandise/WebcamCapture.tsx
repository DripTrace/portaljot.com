"use client";

import { useEffect } from "react";
import ContentComponent from "@/components/merchandise/ContentComponent";
import ImageCaputure from "@/components/merchandise/Payments/Uploads/ImageCaputure";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust the path as needed

export default function VerifyDocument() {
    useEffect(() => {
        async function verifySession() {
            await checkSession();
        }

        verifySession();
    }, []);

    return (
        <ContentComponent title="" description="">
            <ImageCaputure />
        </ContentComponent>
    );
}
