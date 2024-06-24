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
					isLoggedIn.set(1);
					activities.downloadActivities(user.uid);
				}
				else if(!$redirectedToLogin){
					isLoggedIn.set(-1);
					selectedTab.set(routes.get('account'))
					redirectedToLogin.set(true);
					goto('/account');
				}
				else{
					isLoggedIn.set(-1);
				}
			}
		);
		selectedTab.set(routes.get('home'));
	});
	
</script>

<div hidden class="centered subheading roboto-serif"> Track your mood </div>

{#if $isLoggedIn > 0}
	<NewEntry />
{:else if !$redirectedToLogin}
	<div style="display: flex; justify-content: center">
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
	</div>
{:else if $isLoggedIn < 0}
	<h2>Add a new entry</h2>
	<p><a href="account">Login</a> to use the mood tracker.</p>
{/if}

