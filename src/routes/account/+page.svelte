<script charset="utf-8" lang="ts">
	import SignIn from "../../components/sign_in.svelte";
  import { onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { auth } from '../../firebase';
	import {userSettings} from "../../userStore";
	import { isLoggedIn } from "../../userStore";
  import {routes, selectedTab} from "../../stores";
	import { errorMessage } from "../../stores";
	import getErrorMessage from '$lib/errors';
	import { openBanner } from "../../stores";
	import Button from '@smui/button';
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';
	import {mobileNotification, registerPeriodicNotifications, removePeriodicNotifications} from '$lib/notifications';

	let active = false;

	async function signIn(event : CustomEvent) {
	try {
		let user = await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password);
		await updateProfile(user.user, { displayName: event.detail.username });
		userSettings.setUsernameAndEmail(user.user.displayName, user.user.email);
		//await setDoc(userDoc(auth!.currentUser!.uid), $userSettings);
		isLoggedIn.set(1);
		selectedTab.set(routes.get('home'));
		await goto('/');
	} catch (e) {
		errorMessage.set(getErrorMessage(e as Error));
		console.log(e);
		openBanner.set(true);
	}
}
	async function logout() {
		isLoggedIn.set(-1);
		userSettings.reset();
		signOut(auth);
	}

	onAuthStateChanged(auth, (user) => {
		if(user){
			isLoggedIn.set(1)
		}
		else isLoggedIn.set(-1)
	});

	function notifications() {
		if(active == true){
			removePeriodicNotifications();	
			errorMessage.set(
			{
				red: false, 
				message: "Periodic notifications are disabled. To disallow all notifications, revoke the permission from your browser."
			});
			openBanner.set(true);
			active = false;
			return;
		}
		if(!("Notification" in window)) {
			alert("This browser does not support desktop notifications");
			active = false;
		}
		else if(Notification.permission === "granted") {
			var notification = new Notification("Notifications are allowed");
			console.log(notification);
			mobileNotification("Notifications are allowed");
			active = true;
		}
		else if(Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					const notification = new Notification("You allowed notifications.");
					registerPeriodicNotifications();
					console.log(notification);
					mobileNotification("You allowed notifications");
					active = true;
				}
			});
		}
		else{
			errorMessage.set({
				message: "To receive notifications, allow notifications from this website on the top bar of your browser.",
				red: false
			}
			);
			openBanner.set(true);
			active = false;
		}
		userSettings.update((s) => ({...s, notifications: active}));
	}

</script>
<main class="centered">
	<p>Per testare l'applicazione, usa le credenziali "username@gmail.com" e "password".
	</p>

	{#if $isLoggedIn > 0}
	<h3 class="roboto-serif">{auth.currentUser ? auth.currentUser.displayName : "error"}</h3>
	<p>Track your mood!</p>
	<p>
	<FormField>
		<Switch on:click={notifications} bind:value={active}/>
		<span slot="label">Remind me to add a new entry</span>
	</FormField>
	</p>
	{active}
	<Button on:click={logout} variant="unelevated" class="danger">Log out</Button>
{:else}
<div>
	<div class="sign-in-form">
		<SignIn on:login={signIn}/>
		<p style:text-align="center">Don't have an account yet? <a href="/account/register">Sign up</a></p>
	</div>
</div>
{/if}
</main>

