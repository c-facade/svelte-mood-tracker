import { writable } from 'svelte/store';
import {v4 as uuid } from 'uuid';

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

export const defaultActivities : Map<string, Activity> = new Map([]);


function createActStore(){
	const {subscribe, set, update} = writable<Activity[]>(
		[
			{
				symbol: "directions_walk",
				id: "awfuo3i4hio",
				name: "Walk",
				group: "default"
			},
			{
				symbol: "voice_selection",
				id: "034qt8fqw9",
				name: "Talk",
				group: "default"
			}
		]
	);

	const addActivity = (name : string, symbol :string | null, group: string) => {
		const newA = {
			symbol: symbol,
			id: uuid(),
			name: name,
			group: group
		}
		update((acts : Activity[]) => [...acts, newA]);
		return newA;
	}
	
	return {
		subscribe,
		set,
		update,
		addActivity
	}
}

export const activities = createActStore();

