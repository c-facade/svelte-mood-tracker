<script lang="ts">
    import {activities, defaultActivities } from '../activitiesStore';
		import Textfield from '@smui/textfield';
		import Button from '@smui/button';
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

<div class="form-like">
	<h2>New activities!</h2>
	<ul>
		{#each $activities as [, activity]}
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

