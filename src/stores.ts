import { writable } from "svelte/store";

// ROUTES -------------------------------------


export const routes = [
	{
		name: 'home',
		link: '/'
	},
	{
		name: 'diary',
		link: '/diary'
	},
	{
		name: 'statistics',
		link: '/stats'
	},	
	{
		name: 'settings',
		link: '/settings'
	},
	
	{
		name: 'about',
		link: '/about'
	},
	{
		name: 'account',
		link: '/account'
	}
];

export const selectedTab = writable(routes[0]);

//REDIRECTION ----------------

export const redirectedToLogin = writable(false);

// ERRORS -----------

export const errorMessage = writable("Everything OK");

export const openBanner = writable(false);


