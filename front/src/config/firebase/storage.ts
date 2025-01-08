import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

// const storage = getStorage(app);
// const database = getFirestore(app);

// const firebaseStorage = {
// 	projectStorage: storage,
// 	db: database,
// 	timestamp: serverTimestamp(),
// };

const app = initializeApp(firebaseConfig);

const firebaseStorage = {
	projectStorage: getStorage(app),
	db: getFirestore(app),
	timestamp: serverTimestamp(),
};

export const { projectStorage, timestamp, db } = firebaseStorage;
