import { writable } from 'svelte/store';
import {v4 as uuid } from 'uuid';
import JSON from '$lib/activities.json' assert {type: 'json'};
import { auth, db } from './firebase'
import { collection, getDocs, setDoc, doc, Firestore } from 'firebase/firestore';

const defaultJSON = JSON as [string, Activity][]; 

export interface Activity {
	symbol: string | null;
	id : string;
	name : string;
	group: string;
}

export interface Mood {
	id : number;
	name : string;
	value: number;
	symbol: string;
	color: string;
}

export const moods : Mood[] = [ 
	{
		id: 1,
		name: 'great', 
		value: 5,
		symbol: 'sentiment_very_satisfied',
		color: 'green'
	},
	{
		id: 2,
		name: 'good',
		value: 4,
		symbol: 'sentiment_satisfied',
		color: 'teal'
	},
	{
		id: 3,
		name: 'okay',
		value: 3,
		symbol: 'sentiment_satisfied',
		color: 'blue',
	},
	{
		id: 2,
		name: 'not so good',
		value: 2,
		symbol: 'sentiment_dissatisfied',
		color: 'purple'
	},
	{
		id: 1,
		name: 'bad',
		value: 1,
		symbol: 'sentiment_very_dissatisfied',
		color: 'red'
	}
];

export const defaultActivities : Map<string, Activity> = new Map(defaultJSON);

async function getStoredActivities(uid:string) {
	if(uid == null){
		throw new Error("not authenticated");
	}
	const cRef = collection(db as Firestore, "users", uid, "activities");
	const snapshot = await getDocs(cRef);
	if(snapshot.docs.length < 1) {
		return null;
	}
	const stored : Map<string, Activity>= new Map();
	snapshot.forEach((doc) => {
		stored.set(doc.id, doc.data() as Activity);
	});
	return stored;
}

async function storeNewActivity(a : Activity){
	if(auth.currentUser)
		try{
			await setDoc(doc(db, "users", auth.currentUser.uid, "activities", a.id), a);
		} catch (e) {
			console.log(e);
		}
}

async function uploadActivities(initialActivities : Map<string, Activity>, uid : string){
	if(uid == null) throw new Error("not authorised");
	for(const a of initialActivities.values()){
		await setDoc(doc(db, "users", uid, "activities", a.id), a);
	}
}


async function createActStore(){
	const {subscribe, set, update} = writable<Map<string, Activity>>(defaultActivities);

	
	async function downloadActivities(uid : string) {
		try{
			const stored = await getStoredActivities(uid);
			if(stored == null){
				uploadActivities(defaultActivities, uid);
			}
			else{
				set(stored);
			}
		}
		catch(e){
			console.log(e);
		}
	}


	const addActivity = (name : string, symbol :string | null, group: string) => {
		const id = uuid();
		const newA = {
			symbol, name, id, group
		}
		update((acts : Map<string, Activity>) => acts.set(id, newA));
		groups.addActivity(group, id);
		storeNewActivity(newA);
		return newA;
	}
	
	return {
		subscribe,
		set,
		update,
		addActivity,
		downloadActivities
	}
}

/*
function createActStore() {
	const { subscribe, set, update } = writable<Map<string, Activity>>(defaultActivities);
	
	const actQuery = (uid) => (collection(db, "users", uid, "activities"));
	const unsubscribe = onSnapshot(actQuery(uid), (querySnapshot) => {
		const newData : Map<string, Activity> = new Map();
		querySnapshot.docs.forEach((doc) =>
															 {
			newData.set(doc.id, doc.data() as Activity);
		}
		set(newData);
	}

	const getTodos = async () =>
		const res = await getDocs(todosQuery(uid));
		
}
*/

export const activities = await createActStore();

function createGroups(acts: Map<string, Activity>) {
	const groups : Map<string, string[]> = new Map();
	for(const a of acts.values())
		{
			const list : string[] | undefined = groups.get(a.group);
			if(list !== undefined){
				groups.set(a.group, [...list, a.id]);
			}
			else{
				groups.set(a.group, [a.id]);
			}
	}
	console.log(groups);

	const { subscribe, set, update } = writable(groups);
	
	const addActivity = (group: string, id: string) => {
		update((groups) => {
			const list : string[] | undefined = groups.get(group);
			if(list !== undefined){
				groups.set(group, [...list, id]);
			}
			else{
				groups.set(group, [id]);
			}
			return groups;
		});
	}


	return{
		subscribe,
		set,
		update,
		addActivity
	}
}

export const groups = createGroups(defaultActivities);

