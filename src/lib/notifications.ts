import { createEventDispatcher } from "svelte";

export async function registerPeriodicNotifications() {
	const registration = await navigator.serviceWorker.ready;
	try {
		await registration.periodicSync.register("send-notification", {
			minInterval: 24 * 60 * 60 * 1000,
		});
		console.log("Successfully registered periodic notifications.");
	}
	catch {
		console.log("Periodic sync could not be registered.");
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
	const dispatch = createEventDispatcher<{notification:{message: string}}>();
	dispatch('notification', {
		message
	});
}
