import type { WhereFilterOp } from "@google-cloud/firestore";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/merchandise/database/firebaseStorage";

// Define a generic type for the document data structure
export const firestoreGet = async <T>(
    collectionPath: string,
    fieldQuery: string,
    queryFilter: WhereFilterOp,
    searchValue: T | string // T can be any type
): Promise<Array<T & { _id: string }>> => {
    const firestoreQuery = query(
        collection(db, collectionPath),
        where(fieldQuery, queryFilter, searchValue)
    );

    const querySnapshot = await getDocs(firestoreQuery);

    const createdCollection: Array<T & { _id: string }> = [];

    querySnapshot.forEach((document) => {
        const values = document.data() as T;
        createdCollection.push({
            ...values,
            _id: document.id,
        });
    });

    return createdCollection;
};
