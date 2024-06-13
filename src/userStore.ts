import { writable } from "svelte/store";

export const isLoggedIn = writable<boolean>(false);

interface UserSettings {
	username: string | null;
	email: string | null;
	notifications: boolean;
	theme: string;
}

function createUserSettings(){
	const { subscribe, set, update } = writable<UserSettings>({
		username: null,
		email: null,
		notifications: false,
		theme: "dark"
	});

	const setUsernameAndEmail = (username: string | null, email: string | null) =>
		{
			if(username == null || email == null){
				console.log("null username")
				return;
			}
			update((us: UserSettings) => ({...us, username: username, email: email }));
	};

	const reset = () =>
		{
		set({
			username: null,
			email: null,
			notifications: false,
			theme: "dark"
		});
	}

	return {
		subscribe,
		set,
		update,
		setUsernameAndEmail,
		reset
	}
}

export const userSettings = createUserSettings();
