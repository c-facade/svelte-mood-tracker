import { writable } from 'svelte/store';
//import { v4 as uuid } from 'uuid';

export interface Entry {
	activityName: string;
	activityId: string; 
	value: number | boolean;
}

export interface DiaryPage {
	entries: Entry[];
	date: Date;
}

function createDiary(){
	const {subscribe, set, update} = writable<DiaryPage[]>([]);

	const addPage = (page : DiaryPage) => {
		update((d) => [...d, page]);
	}


	return {
		subscribe,
		set,
		update,
		addPage
	}
}

export const diary = createDiary();
