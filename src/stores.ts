import { writable } from "svelte/store";

// ROUTES -------------------------------------

interface route {
	name: string;
	mobileName: string;
	link: string;
	icon: string;
}

export const routes : Map<string, route>= new Map([
	['home', {
		name: 'home',
		mobileName: 'home',
		link: '/',
		icon: 'home'
	}],
	['diary',
	{
		name: 'diary',
		mobileName: 'diary',
		link: '/diary',
		icon: 'book'
	}],
	['stats',
	{
		name: 'statistics',
		mobileName: 'stats',
		link: '/stats',
		icon: 'insights'
	}],
	['about',
	{
		name: 'about',
		mobileName: 'about',
		link: '/about',
		icon: 'info'
	}],
	['account',
	{
		name: 'account',
		mobileName: 'account',
		link: '/account',
		icon: 'account_circle'
	}]
]);

export const selectedTab = writable<undefined | route>(undefined);

//REDIRECTION ----------------

export const redirectedToLogin = writable(false);

// ERRORS -----------

export const errorMessage = writable("Everything OK");

export const openBanner = writable(false);

export const entryDate = writable<Date>(new Date());

