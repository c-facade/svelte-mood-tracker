/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
import { build, files, prerendered, version } from '$service-worker';

// creates a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build,
	...files,
	...prerendered
]

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache);
});

self.addEventListener("activate", (event) => {
	// remove previous cached data from disk
	async function deleteOldCaches() {
		for(const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

// should we intercept fetch requests or only use
// the cache when we are offline? let's make some tests
// TODO tests

function showNotification(message : string) {
	if (Notification.permission === "granted"){
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification(message);
		});
		console.log("tried to show notification. Did it work?");
	}
}

self.addEventListener("periodicsync", (event) => {
	if(event.tag === "send-notification") {
		console.log("NOTIFICATION!");
		showNotification("Track your mood");
	}
});

self.addEventListener("notify", (event) => {
	showNotification(event.detail.message);
});
