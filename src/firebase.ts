import { app } from './firebaseConf';
import { getAuth } from "firebase/auth";
import { doc, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

// funzione che recupera l'ID del documento dell'utente
export const userDoc = (userId: string) => doc(db, "users", userId)

