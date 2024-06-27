import { createEventDispatcher } from "svelte";


// TODO deal with catching this error.
// Maybe throw event. To by intercepted by who??
export async function registerPeriodicNotifications() {
	const status = await navigator.permissions.query( { name: 'periodic-background-sync'});
	if(status.state === 'granted'){
		const registration = await navigator.serviceWorker.ready;
		if(!("periodicSync" in registration)){
			throw new Error("Periodic sync could not be registered");
		}
		try {
				const periodicSync = registration.periodicSync;
			await periodicSync.register("send-notification", {
				minInterval: 60 * 1000,
			});
			console.log("Successfully registered periodic notifications once a minute.");
		}
		catch {
			console.log("Periodic sync could not be registered.");
		}
	}
	else{
		console.log("I don't have the authorization.");
	}
}

export async function removePeriodicNotifications() {
	navigator.serviceWorker.ready.then((registration) => {
		registration.periodicSync.unregister("send-notification");
		console.log("Successfully removed periodic notifications.");
	});
}

export async function askForPeriodicSync() {
	const status = await navigator.permissions.query({
		name: 'periodic-background-sync' as PermissionName,
	});
	if(status.state == 'granted') {
		return true;
	}
	else{
		return false;
	}
}

export function mobileNotification(message: string){
	const dispatch = createEventDispatcher<{notify:{message: string}}>();
	dispatch('notify', {
		message
	});
}
