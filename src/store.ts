import { writable, type Writable } from 'svelte/store';

export interface Entry{
	id: number;
	name: string;
	value: number;
}

type DiaryPage = Entry[];

function createDiaryStore() {
	const { subscribe, set, update } = writable<DiaryPage[]>([]);

	//scrivere funzioni per l'api

	const addPage = (page : DiaryPage) =>
		{
			update(d => [page, ...d]);
		}
}
