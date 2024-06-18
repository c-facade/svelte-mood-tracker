import { writable } from "svelte/store";

// ROUTES -------------------------------------

interface route {
	name: string;
	link: string;
}

export const routes : Map<string, route>= new Map([
	['home', {
		name: 'home',
		link: '/'
	}],
	['diary',
	{
		name: 'diary',
		link: '/diary'
	}],
	['stats',
	{
		name: 'statistics',
		link: '/stats'
	}],
	['settings',
	{
		name: 'settings',
		link: '/settings'
	}],
	['about',
	{
		name: 'about',
		link: '/about'
	}],
	['account',
	{
		name: 'account',
		link: '/account'
	}]
]);

export const selectedTab = writable<undefined | route>(undefined);

//REDIRECTION ----------------

export const redirectedToLogin = writable(false);

// ERRORS -----------

export const errorMessage = writable("Everything OK");

export const openBanner = writable(false);


