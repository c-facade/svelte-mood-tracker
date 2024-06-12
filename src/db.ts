import { writable } from 'svelte/store';
import {v4 as uuid } from 'uuid';


export interface Activity {
	id : string;
	name : string;
}

export interface Mood {
	id : number;
	name : string;
	value: number;
}

// it's an instance of an Activity
export interface Entry {
	activity : Activity;
	value: number | boolean;
}

export interface DiaryPage {
	mood : Mood;
	entries : Entry[];
}

export const moods : Mood[] = [ 
	{
		id: 1,
		name: 'great', 
		value: 5
	},
	{
		id: 2,
		name: 'good',
		value: 4
	},
	{
		id: 3,
		name: 'okay',
		value: 3,
	},
	{
		id: 2,
		name: 'not so good',
		value: 2,
	},
	{
		id: 1,
		name: 'bad',
		value: 1
	}
];

function createActStore(){
	const {subscribe, set, update} = writable<Activity[]>(
		[
			{
				id: "awfuo3i4hio",
				name: "Walk"
			},
			{
				id: "034qt8fqw9",
				name: "Talk"
			}
		]
	);

	const addActivity = (name : string) => {
		const newA = {
			id: uuid(),
			name: name
		}
		update((acts : Activity[]) => [...acts, newA]); 
	}
	
	return {
		subscribe,
		set,
		update,
		addActivity
	}
}

export const activities = createActStore();
