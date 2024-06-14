<script charset="utf-8" lang="ts">
  import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
	import SignUp from "../../../components/sign_up.svelte";
	import { goto } from "$app/navigation";
	import { auth, userDoc } from '../../../firebase';
	import { setDoc } from 'firebase/firestore/lite';
  import {isLoggedIn, userSettings} from "../../../userStore";
	let error : string;

	async function signUp(event: CustomEvent) {
		try{
			console.log("register: sign up!")
		  // creazione utente
			let user = await createUserWithEmailAndPassword(
				auth,
				event.detail.email,
				event.detail.password
			);
			await updateProfile(user.user, {displayName: event.detail.username });
			isLoggedIn.set(true)
			userSettings.setUsernameAndEmail(user.user.displayName, user.user.email);
			// creo un nuovo documento con i dati dell'utente
			await setDoc(userDoc(auth!.currentUser!.uid), $userSettings);
			await goto('/');
			
			} catch (e) {
				console.log('Error in creating user', e);
				error = String(e);
			}
		}	
</script>

<div>
	<div class="form-container">
		{#if error}
				<div class="notification-block">
					<p>{error}</p>
				</div>
		{/if}
		<SignUp on:signup={signUp}/>
		<p>Already have an account? <a href="/account">Login</a></p>
	</div>
</div>
