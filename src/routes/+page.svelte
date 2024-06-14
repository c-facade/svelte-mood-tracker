<h1>Mood Tracker</h1>
<p> Track your mood! </p>

<script lang="ts">
    import {onMount} from 'svelte';
		import NewEntry from '../components/NewEntry.svelte';
    import {onAuthStateChanged} from 'firebase/auth';
    import {auth} from '../firebase';
		import { isLoggedIn } from '../userStore'; 
    import {goto} from '$app/navigation';
		import {routes, selectedTab, redirectedToLogin} from '../stores';
		import CircularProgress from '@smui/circular-progress';
	

	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				if(user) isLoggedIn.set(true);
				else if(!$redirectedToLogin){
					window.setTimeout(()=>{}, 1000);
					selectedTab.set(routes[5])
					redirectedToLogin.set(true);
					goto('/account');
				}
			}
		);
	});

</script>

<p><b>Nota:</b> i dati che inserisci non sono permanenti, e non vengono caricati sul database.</p>

{#if $isLoggedIn}
	<NewEntry />
{:else if !$redirectedToLogin}
	<div style="display: flex; justify-content: center">
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
	</div>
{:else}
	<p><a href="account">Login</a> to use the mood tracker.</p>
{/if}
