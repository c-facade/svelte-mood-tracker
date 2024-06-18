<script lang="ts">
    import {onMount} from 'svelte';
		import NewEntry from '../components/NewEntry.svelte';
    import {onAuthStateChanged} from 'firebase/auth';
    import {auth} from '../firebase';
		import { isLoggedIn } from '../userStore'; 
    import {goto} from '$app/navigation';
		import {routes, selectedTab, redirectedToLogin} from '../stores';
		import { activities } from '../activitiesStore';
		import CircularProgress from '@smui/circular-progress';

	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				if(user){
					isLoggedIn.set(true);
					activities.downloadActivities(user.uid);
				}
				else if(!$redirectedToLogin){
					window.setTimeout(()=>{}, 1000);
					selectedTab.set(routes.get('account'))
					redirectedToLogin.set(true);
					goto('/account');
				}
			}
		);
		selectedTab.set(routes.get('home'));
	});
	
</script>

<main>
	
<h1>Mood Tracker</h1>
<p> Track your mood! </p>

{#if $isLoggedIn}
	<NewEntry />
{:else if !$redirectedToLogin}
	<div style="display: flex; justify-content: center">
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
	</div>
{:else}
	<p><a href="account">Login</a> to use the mood tracker.</p>
{/if}

</main>
