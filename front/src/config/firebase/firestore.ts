import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { serviceAccount } from "./serviceAccount";
import { FirebaseAdapter } from "@/lib/modify/firebase/FirebaseAdapter";
import { firebaseConfig } from "./firebaseConfig";

// export const adapterInstance = FirebaseAdapter({
// 	db: getFirestore(initializeApp(firebaseConfig)),
// });

// export const adapterInstance = FirebaseAdapter({
// 	db: getFirestore(initializeApp(serviceAccount)),
// });

export async function connectToFirebase() {
	const firestoreConnect = getFirestore(initializeApp(firebaseConfig));

	return firestoreConnect;
}

export const firestoreConnect = getFirestore(initializeApp(firebaseConfig));

const firestore = () => {
	const FirebaseClientObject = {
		db: firestoreConnect,
	};

	return FirebaseClientObject;
};

export const adapterInstance = FirebaseAdapter(firestore());
