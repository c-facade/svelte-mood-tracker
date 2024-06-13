<h1>Mood Tracker</h1>
<p> Track your mood! </p>

<script lang="ts">
    import {onMount} from 'svelte';
		import NewEntry from '../components/NewEntry.svelte';
    import {onAuthStateChanged} from 'firebase/auth';
    import {auth} from '../firebase';
		import { isLoggedIn } from '../userStore'; 
    import {goto} from '$app/navigation';


	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				if(user) isLoggedIn.set(true);
			}
		);
			
		if(!$isLoggedIn){
			console.log("not logged in")
			goto('/account')
		}
	});

</script>

<p><b>Nota:</b> i dati che inserisci non sono permanenti, e non vengono caricati sul database.</p>

{#if $isLoggedIn}
	<NewEntry />
{/if}
