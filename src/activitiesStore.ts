import { writable, get } from 'svelte/store';
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
	archived: boolean;
}

export interface Mood {
	id : number;
	name : string;
	value: number;
	symbol: string;
	color: string;
}

// MOODS ---------------------------------------------------------

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


// ACTIVITIES SYNC ------------------------------------------

export const defaultActivities : Map<string, Activity> = new Map(defaultJSON);

async function getStoredActivities(uid:string | null) {
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

async function storeActivity(a : Activity, uid: string | null){
	if(uid == null) throw new Error("not authenticated");
		try{
			setDoc(doc(db, "users", uid, "activities", a.id), a);
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


// ACTIVITIES STORE -----------------------------------------------

function createActStore(){
	const {subscribe, set, update} = writable<Map<string, Activity>>(defaultActivities);

	
	const downloadActivities = async (uid : string) => {
		try{
			const stored = await getStoredActivities(uid);
			if(stored == null){
				uploadActivities(defaultActivities, uid);
			}
			else{
				set(stored);
			}
			groups.load()
		}
		catch(e){
			console.log(e);
		}
	}


	const addActivity = (name : string, symbol :string | null, group: string) => {
		const id = uuid();
		const newA = {
			symbol, name, id, group, archived: false
		}
		update((acts : Map<string, Activity>) => acts.set(id, newA));
		groups.addActivity(group, id);
		if(auth!.currentUser){
			storeActivity(newA, auth.currentUser.uid);
		}
		return newA;
	}

	const updateWith = async (temporary : Activity[]) => {
		const uid = (auth!.currentUser) ? auth!.currentUser.uid : null;
		const stored = await getStoredActivities(uid);
		if(stored) set(stored);
		for(const a of temporary){
			if(a.id == ""){
				a.id = uuid();
			}
			update((acts: Map<string, Activity>) => acts.set(a.id, a));
			storeActivity(a, uid);
		}
		groups.load();		
	}

	const deleteGroup = (group : string) => {
		update((acts: Map<string, Activity>) => {
			for( const a of acts.values()){
				if(a.group == group){
					a.archived = true;
				}
			}
			groups.load();
			if(auth!.currentUser) uploadActivities(acts, auth.currentUser.uid);
			return acts;
		});
	}


	
	return {
		subscribe,
		set,
		update,
		downloadActivities,
		addActivity,
		updateWith, 
		deleteGroup
	}
}

export const activities = createActStore();

export function cloneActivity(a: Activity | undefined){
	if(a == undefined) return null;
	const newA : Activity= {
		symbol: a.symbol,
		id: a.id,
		name: a.name,
		group: a.group,
		archived: false
	}
	return newA;
}
		

function createGroups() {
	const groups : Map<string, string[]> = new Map();

	const { subscribe, set, update } = writable(groups);

	/*
	const load = (acts: Map<string, Activity>) => {
		const newGroups : Map<string, string[]> = new Map();
		for(const a of acts.values())
			{
				const list : string[] | undefined = newGroups.get(a.group);
				if(list !== undefined){
					newGroups.set(a.group, [...list, a.id]);
				}
				else{
					newGroups.set(a.group, [a.id]);
				}
			}
		set(newGroups);
		}
	 */
	const load = () => {
		const newGroups : Map<string, string[]> = new Map();
		const acts = get(activities);
		for(const a of acts.values())
			{
				if(a.archived) continue;
				const list : string[] | undefined = newGroups.get(a.group);
				if(list !== undefined){
					newGroups.set(a.group, [...list, a.id]);
				}
				else{
					newGroups.set(a.group, [a.id]);
				}
			}
		set(newGroups);
		}

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
		addActivity,
		load
	}
}

export const groups = createGroups();

