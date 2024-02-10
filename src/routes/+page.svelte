<h1>Mood Tracker</h1>
<p> Track your mood! </p>

<script lang="ts">
	import { activities } from '../store.ts';
	const moods= [ 
		{
			name: 'great', 
			value: 5
		},
		{
			name: 'good',
			value: 4
		},
		{
			name: 'okay',
			value: 3,
		},
		{
			name: 'not so good',
			value: 2,
		},
		{
			name: 'bad',
			value: 1
		}
	];

	let entries = [];

	function addEntry(e) {
		const formData = new FormData(e.target);
		for(const [key, value] of formData) {
			entries = [`${key}: ${value}`, ...entries];
		}
	}

	function yeas(e) {
		const formData = new FormData(e.target);
		for(const [, value] of formData) {
			console.log(`You did ${value} today. Slay.`);
		}
	}

	let newActivity = "";
	
	function addActivity() {
		if(newActivity != ""){
			activities.addActivity(newActivity);
		}
		newActivity = "";
	}

</script>

<form on:submit|preventDefault={addEntry}>
	<fieldset>
		<legend>How are you today?</legend>
		{#each moods as mood}
		<p>
			<input type="radio" name="mood" id="mood-{mood.value}" value={mood.name} />
			<label for="mood-{mood.value}">{mood.name}</label>
			<p>
		{/each}
	<button type="submit">Save</button>
	</fieldset>
</form>

<form on:submit|preventDefault={yeas}>
	<fieldset>
		<legend>What did you do?</legend>
		{#each $activities as [ , activity]}
			<input type="checkbox" name={activity.name} id={activity.id} value={activity.name} />
			<label for={activity.id}>{activity.name}</label><br/>
		{/each}
		<button type="submit">OK</button>
	</fieldset>
</form>

<form class="insert">
	<legend>Add a new activity</legend>
	<input type="text" placeholder="Swim" bind:value={newActivity}/>
	<br/>
	<p>
		The new activity will be {newActivity}
	</p>
	<button on:click={addActivity}>Add</button>
</form>

<div style="margin:10px; padding:2px; border: solid 1px black;">
	{#each entries as entry}
		<p class="diary-entry">
			{entry}
		</p>
	{/each}
</div>

<style>
	form {
		margin: 5px;
	}
	.insert{
		margin: 10px;
		border: solid 1px black;
		padding: 5px;
		line-height: 1.5em;
	}
	.insert legend {
		margin:2px;
	}
</style>
