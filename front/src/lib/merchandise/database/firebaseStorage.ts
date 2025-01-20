import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { firebaseConfig } from "@/pages/api/merchandise/keys/firebase";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getFirestore(app);
const projectStorage = storage;
const db = database;
const timestamp = serverTimestamp();
export { projectStorage, timestamp, db };
