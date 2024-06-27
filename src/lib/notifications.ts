import { createEventDispatcher } from "svelte";


// TODO deal with catching this error.
// Maybe throw event. To by intercepted by who??
export async function registerPeriodicNotifications() {
	/*
	const permissionStatus = await navigator.permissions.query({
				name: <PermissionName> "periodic-background-sync",
	});
	if(permissionStatus.state !== 'granted'){
			return false;
	}
	 */
	if(!navigator.serviceWorker){
		return false;
	}
	const registration = await navigator.serviceWorker.ready;
	if(!("periodicSync" in registration)){
	console.log("This browser doesn't recognise periodic sync.");
	return false;
	}
	try {
			const periodicSync = registration.periodicSync;
		await periodicSync.register("send-notification", {
			minInterval: 24* 60 * 60 * 1000,
		});
		console.log("Successfully registered periodic notifications once a minute.");
		return true;
	}
	catch {
		console.log("Periodic sync could not be registered.");
		return false;
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
