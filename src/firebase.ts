import { app } from './firebaseConf';
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from 'firebase/firestore/lite';

const auth = getAuth(app);
const db = getFirestore(app);
// funzione che recupera il documento dell'utente
export const userDoc = (userId: string) => doc(db, "users", userId)

export {
	auth
}
