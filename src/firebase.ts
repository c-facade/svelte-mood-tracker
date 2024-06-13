import { app } from './firebaseConf';
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore } from 'firebase/firestore/lite';

const auth = getAuth(app);
let db = getFirestore(app);
const userDoc = (userId) => doc(db, "users", userId)

export {
	auth,
}
