<h1>Mood Tracker</h1>
<p> Track your mood! </p>

<script>
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
</style>
