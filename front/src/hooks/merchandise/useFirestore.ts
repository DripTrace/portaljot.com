"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/merchandise/database/firebaseStorage";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface DocumentData {
    id: string;
    createdAt: Date;
    name?: string;
    email?: string;
    role?: string;
    stripeId?: string;
    customerId?: string;
    images?: string[];
    obinsunId?: string;
    printful?: boolean;
    registeredInfo?: any; // Replace with the actual type if known
    firstname?: string;
    lastname?: string;
    username?: string;
    shipping?: any; // Replace with the actual type if known
    necessary_actions?: any; // Replace with the actual type if known
    personal_info?: any; // Replace with the actual type if known
    verification?: any; // Replace with the actual type if known
    external_accounts?: any; // Replace with the actual type if known
    company_verification?: any; // Replace with the actual type if known
    individual_verification?: any; // Replace with the actual type if known
    stripe_metadata?: any; // Replace with the actual type if known
    stripeBalance?: number;
    [key: string]: any; // For any additional fields not explicitly defined
}

const useFirestore = (collections: string) => {
    const [docs, setDocs] = useState<DocumentData[]>([]);

    useEffect(() => {
        const collectionsRef = collection(db, collections);
        const collectionsQuery = query(
            collectionsRef,
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(collectionsQuery, (snapshot) => {
            const documents: DocumentData[] = snapshot.docs.map((doc) => {
                const data = doc.data() as DocumentData;
                return {
                    ...data,
                    id: doc.id, // Manually set the `id` property to ensure it isn't overwritten
                };
            });
            setDocs(documents);
        });

        return () => unsub();
    }, [collections]);

    return { docs };
};

export default useFirestore;
