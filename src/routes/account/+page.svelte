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
  import Settings from "../../components/Settings.svelte";
    import {onMount} from "svelte";

	onMount(() => {
		onAuthStateChanged( auth, () => {
			userSettings.updateFromStorage();
		})
	});

	async function signIn(event : CustomEvent) {
		try {
			let user = await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password);
			await updateProfile(user.user, { displayName: event.detail.username });
			//userSettings.setUsernameAndEmail(user.user.displayName, user.user.email);
			userSettings.updateFromStorage();
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

</script>
<main class="centered">
	{#if $isLoggedIn > 0}
	<h3 class="roboto-serif">{auth.currentUser ? auth.currentUser.displayName : "error"}</h3>
	<p>
	<Button on:click={logout} variant="unelevated" class="danger">Log out</Button>
		</p>
	<Settings />
{:else}
<div>
	<div class="sign-in-form">
		<SignIn on:login={signIn}/>
		<p style:text-align="center">Don't have an account yet? <a href="/account/register">Sign up</a></p>
	</div>
</div>
{/if}
</main>

