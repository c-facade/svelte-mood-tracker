import { app } from './firebaseConf';
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from 'firebase/firestore';

export const auth = getAuth(app);
export const db = getFirestore(app);
// funzione che recupera l'ID del documento dell'utente
export const userDoc = (userId: string) => doc(db, "users", userId)

