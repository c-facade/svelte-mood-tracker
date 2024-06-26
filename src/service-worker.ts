import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const precache_list = [...build, ...files, ...prerendered].map((s) => ({
	url: s,
	revision: version,
}));

precacheAndRoute(precache_list);

/*
self.addEventListener('activate', event => {
	console.log("Service worker activating.");
	event.waitUntil(
		caches
			.keys()
			.then(keys => keys.filter(key => key !== precache_list))
			.then(keys => Promise.all(keys.map(key => caches.delete(key))))
		);
});
 */

function showNotification(message : string) {
	if (Notification.permission === "granted"){
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification(message);
		});
	}
}

self.addEventListener("periodicsync", (event) => {
	if(event.tag === "send-notification") {
		console.log("NOTIFICATION!");
		showNotification("Track your mood");
	}
});

self.addEventListener("notification", (event) => {
	showNotification(event.message);
});
