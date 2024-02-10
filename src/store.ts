import { writable} from 'svelte/store';
import {v4 as uuid} from 'uuid';

export interface Entry{
	id: number;
	name: string;
	value: number;
}

//type DiaryPage = Entry[];

/*

function createDiaryStore() {
	const { subscribe, set, update } = writable<DiaryPage[]>([]);

	//scrivere funzioni per l'api

	const addPage = (page : DiaryPage) =>
		{
			update(d => [page, ...d]);
		}
}

 */

export interface Activity {
	id: string;
	name: string;
}

/* TODO integrate this
interface MultiActivity extends Activity{
	id : string;
	name: string;
	values: [];
}
 */

const defaultMap = new Map<string, Activity>([
	["292dksj3498", {
		id:"292dksj3498",
		name: "Walk"}],
	["92d29jd2uj92d", {
		id:"92d29jd2uj92d", 
		name: "Talk"}]
])

function createActivityStore() {
	const { subscribe, set, update } = writable<Map<string, Activity>>(defaultMap);
	
	const addActivity = (text :string) => {
		const id = uuid();
		const act : Activity = {
			id,
			name: text
		};
		update(map => map.set(id, act));
	}

	return {
		subscribe,
		set,
		update,
		addActivity
	}
}

export const activities = createActivityStore();
