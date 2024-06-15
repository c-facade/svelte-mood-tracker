<script lang="ts">
    import {onMount} from 'svelte';
		import NewEntry from '../components/NewEntry.svelte';
    import {onAuthStateChanged} from 'firebase/auth';
    import {auth} from '../firebase';
		import { isLoggedIn } from '../userStore'; 
    import {goto} from '$app/navigation';
		import {routes, selectedTab, redirectedToLogin} from '../stores';
		import CircularProgress from '@smui/circular-progress';
    import {activities, defaultActivities} from '../activitiesStore';
		import  IconButton  from '@smui/icon-button';
		import Textfield from '@smui/textfield';
		import Button from '@smui/button';

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
	
	let name = "";
	let symbol = "";
	let group = "";

	function add(){
		if(name == "") return;
		const nuova = activities.addActivity(
			name,
			symbol === "" ? null : symbol,
			group === "" ? "default" : group
		);
		defaultActivities.set(nuova.id, nuova);
	}
	
	function printList() {
		console.log([... defaultActivities]);
		console.log(JSON.stringify([... defaultActivities]));
	}
</script>

<main>
	
<h1>Mood Tracker</h1>
<p> Track your mood! </p>

	<p><b>Nota:</b> i dati che inserisci non sono permanenti, e non vengono caricati sul database.</p>

	<IconButton class="material-symbols-outlined">
	grade</IconButton>

	<h2>New activities!</h2>
	<div class="form-like">
	<ul>
	{#each $activities as activity}
		<li>
			<span class="material-symbols-outlined" style:margin="5px">{activity.symbol}</span>&ensp;&emsp;
			<b>{activity.name}</b>&emsp;group: {activity.group}
		</li>
	{/each}
	</ul>
	
	<Textfield type="text" placeholder="insert new activity" bind:value={name} label="name" required>
	</Textfield>
	<Textfield type="text" placeholder="insert new activity" bind:value={symbol} label="symbol">
	</Textfield>
	<Textfield type="text" placeholder="insert new activity" bind:value={group} label="group">
	</Textfield>

	<Button on:click={add}>ADD</Button>
	<Button on:click={printList}>PRINT</Button>
	</div>


{#if $isLoggedIn}
	<NewEntry />
{:else if !$redirectedToLogin}
	<div style="display: flex; justify-content: center">
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
	</div>
{:else}
	<p><a href="account">Login</a> to use the mood tracker.</p>
{/if}

{#each defaultActivities as [, activity]}
	<p>{activity}
	</p>
{/each}


</main>
