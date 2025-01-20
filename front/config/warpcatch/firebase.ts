import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyD3DRrxiGJQYZPl3HkqLdQ3SyYHqEVnCOU",
	authDomain: "stage-warpcatch-com.firebaseapp.com",
	projectId: "stage-warpcatch-com",
	storageBucket: "stage-warpcatch-com.appspot.com",
	messagingSenderId: "952067223664",
	appId: "1:952067223664:web:91007c759cf739a735c4b5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
