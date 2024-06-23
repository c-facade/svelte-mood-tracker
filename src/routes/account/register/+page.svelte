<script charset="utf-8" lang="ts">
  import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
	import SignUp from "../../../components/sign_up.svelte";
	import { goto } from "$app/navigation";
	import { auth, userDoc } from '../../../firebase';
	import { setDoc } from 'firebase/firestore';
  import {isLoggedIn, userSettings} from "../../../userStore";
    import {errorMessage, openBanner, routes, selectedTab} from "../../../stores";
    import getErrorMessage from "$lib/errors";

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
			isLoggedIn.set(1)
			userSettings.setUsernameAndEmail(user.user.displayName, user.user.email);
			// creo un nuovo documento con i dati dell'utente
			await setDoc(userDoc(auth!.currentUser!.uid), $userSettings);
			selectedTab.set(routes.get('home'));
			goto('/');
		
			} catch (e) {
				errorMessage.set(getErrorMessage(e as Error));
				console.log('Error in creating user', e);
				openBanner.set(true);
			}
		}	
</script>

<main>
<div>
	<div class="form-container">
		<SignUp on:signup={signUp}/>
		<p style:text-align="center">Already have an account? <a href="/account">Login</a></p>
	</div>
</div>
</main>
