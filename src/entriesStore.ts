import { writable } from 'svelte/store';
//import { v4 as uuid } from 'uuid';
import { auth, db } from './firebase';
import { collection, query, addDoc, getDocs, orderBy } from 'firebase/firestore';


export interface Entry {
	activityName: string;
	activityId: string; 
	value: number | boolean;
}

export interface DiaryPage {
	date: Date;
	note: string | null;
	entries: Entry[];
}

async function getStoredEntries() {
	if(auth!.currentUser){
		const uid : string= auth.currentUser.uid;
		const cRef = collection(db, "users", uid, "entries"); 
		const snapshot = await getDocs(query(cRef, orderBy("date", "desc")));
		const stored : DiaryPage[] = snapshot.docs.map((e) => (
			{date: e.data().date.toDate(),
				entries: e.data().entries,
				note: e.data().note
			} as DiaryPage)
																									);
		return stored;
	}
	else{
		throw new Error("not authorised");
	}
}

async function uploadPage(page : DiaryPage){
	if(auth!.currentUser){
		try{
			const uid = auth!.currentUser.uid;
			addDoc(collection(db, "users", uid, "entries"), page);
		}
		catch(e){
			console.log(e);
		}
	}
}

function createDiary(){
	const {subscribe, set, update} = writable<DiaryPage[]>([]);

	const addPage = (page : DiaryPage) => {
		update((d) => [...d, page]);
		uploadPage(page);
	}
	
	const updateFromFirestore = async () => {
		try{
			set(await getStoredEntries());
		}
		catch(e){
			console.log(e);
		}
	}


	return {
		subscribe,
		set,
		update,
		addPage,
		updateFromFirestore
	}
}

export const diary = createDiary();
