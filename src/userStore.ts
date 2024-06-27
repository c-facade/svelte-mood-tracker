import { writable } from "svelte/store";
import { auth, db } from "./firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export const isLoggedIn = writable<number>(0);

interface UserSettings {
	username: string | null;
	email: string | null;
	onlineNotifications: boolean;
	periodicNotifications : boolean;
	theme: string;
}

const getStoredSettings = async () => {
	if(auth.currentUser){
		const uid = auth.currentUser.uid;
		const ref = doc(db, "users", uid);
		const userdoc = await getDoc(ref)
		return userdoc.data() as UserSettings;
	}
	return null;
}

function createUserSettings(){
	const { subscribe, set, update } = writable<UserSettings>({
		username: null,
		email: null,
		onlineNotifications: false,
		periodicNotifications: false,
		theme: "dark"
	});
	
	const updateFromStorage = async () => {
		const settings = await getStoredSettings();
		if(settings != null){
			set(settings)
		}
	}

	const setUsernameAndEmail = (username: string | null, email: string | null) =>
		{
			if(username == null || email == null){
				console.log("null username")
				return;
			}
			update((us: UserSettings) => ({...us, username: username, email: email }));
	};

	const setOnlineNotifications = (granted : boolean) => {
		update((s) => ({...s, onlineNotifications: granted}));
		if(auth.currentUser){
			const userdata = doc(db, "users", auth.currentUser.uid);
			updateDoc( userdata, {
				onlineNotifications: granted
			});
		}
		console.log("usersettings: updated status");
	}
	
	const setPeriodicNotifications = (granted: boolean) => {
		update((s) => ({...s, periodicNotifications: granted}));
		if(auth.currentUser){
			const userdata = doc(db, "users", auth.currentUser.uid);
			updateDoc( userdata, {
				periodicNotifications: granted
			});
		}
		console.log("usersettings: updated status");
	}

	const reset = () =>
		{
		set({
			username: null,
			email: null,
			onlineNotifications: false,
			periodicNotifications: false,
			theme: "dark"
		});
	}

	return {
		subscribe,
		set,
		update,
		setUsernameAndEmail,
		reset,
		setOnlineNotifications,
		setPeriodicNotifications,
		updateFromStorage,
	}
}

export const userSettings = createUserSettings();
