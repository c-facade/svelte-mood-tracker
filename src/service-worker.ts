/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

// creates a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build,
	...files,
	...prerendered
]

sw.addEventListener('install', (event) => {
	sw.skipWaiting();
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

sw.addEventListener("activate", (event) => {
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

sw.addEventListener("periodicsync", (event) => {
	if(event.tag === "send-notification") {
		console.log("NOTIFICATION!");
		showNotification("Track your mood");
	}
});

sw.addEventListener("notify", (event) => {
	console.log("notification")
	showNotification(event.detail.message);
});
