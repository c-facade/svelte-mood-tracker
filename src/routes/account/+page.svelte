<script charset="utf-8" lang="ts">
	import SignIn from "../../components/sign_in.svelte";
  import { onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { auth, userDoc } from '../../firebase';
  import { setDoc } from 'firebase/firestore/lite';
	import {userSettings} from "../../userStore";
	import { isLoggedIn } from "../../userStore";
  import {routes, selectedTab} from "../../stores";
	import { errorMessage } from "../../stores";
	import getErrorMessage from '$lib/errors';
	import { openBanner } from "../../stores";

	async function signIn(event : CustomEvent) {
	try {
		let user = await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password);
		await updateProfile(user.user, { displayName: event.detail.username });
		userSettings.setUsernameAndEmail(user.user.displayName, user.user.email);
		//await setDoc(userDoc(auth!.currentUser!.uid), $userSettings);
		isLoggedIn.set(true);
		selectedTab.set(routes.get('home'));
		await goto('/');
	} catch (e) {
		errorMessage.set(getErrorMessage(e as Error));
		console.log(e);
		openBanner.set(true);
	}
}
	async function logout() {
		isLoggedIn.set(false);
		userSettings.reset();
		signOut(auth);
	}

	onAuthStateChanged(auth, (user) => {
		if(user){
			$isLoggedIn = true
		}
		else $isLoggedIn = false;
	});
</script>
<main>
	<p>Per testare l'applicazione, usa le credenziali "username@gmail.com" e "password".
	</p>

{#if $isLoggedIn}
	<h4>{auth.currentUser ? auth.currentUser.displayName : "error"}</h4>
	<button on:click={logout} class="danger">Log out</button>
{:else}
<div>
	<div class="sign-in-form">
		<SignIn on:login={signIn}/>
		<p style:text-align="center">Don't have an account yet? <a href="/account/register">Sign up</a></p>
	</div>
</div>
{/if}

</main>
