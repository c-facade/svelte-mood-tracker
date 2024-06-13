<script charset="utf-8" lang="ts">
	import SignIn from "../../components/sign_in.svelte";
  import { onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { auth, userDoc } from '../../firebase';
  import { setDoc } from 'firebase/firestore/lite';
	import {userSettings} from "../../userStore";
	import { isLoggedIn } from "../../userStore";
	
	let error : string;

	async function signIn(event : CustomEvent) {
	try {
		let user = await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password);
		await updateProfile(user.user, { displayName: event.detail.username });
		userSettings.setUsernameAndEmail(user.user.displayName, user.user.email);
		await setDoc(userDoc(auth!.currentUser!.uid), $userSettings);
		isLoggedIn.set(true);
		await goto('/');
	} catch (e) {
			console.log('error in login', e);
			error = String(e);
	}
}
	async function logout() {
		isLoggedIn.set(false);
		userSettings.reset();
		signOut(auth);
	}

	onAuthStateChanged(auth, (user) => {
		if(user) $isLoggedIn = true
		else $isLoggedIn = false;
	});
</script>

{#if $isLoggedIn}
	<h4>{auth.currentUser.displayName}</h4>
	<button on:click={logout} class="danger">Log out</button>
{:else}
<div>
	<header>
		<h4>
			Login
		</h4>
	</header>
	<div class="sign-in-form">
		{#if error}
			<div class="notification-block">
				<p>{error}</p>
			</div>
		{/if}
		<SignIn on:login={signIn}/>
		<p>Don't have an account yet? <a href="/account/register">Sign up</a></p>
	</div>
</div>
{/if}
