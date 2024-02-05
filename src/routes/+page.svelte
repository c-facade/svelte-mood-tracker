<h1>Mood Tracker</h1>
<p> Track your mood! </p>

<script>
	const moods= [ 
		{
			name: 'great', 
			value: 5},
		{name: 'good',
			value: 4}
		, 'okay', 'not so good', 'bad'];
</script>

<form>
	<fieldset>
		<legend>How are you today?</legend>
		{#each moods as mood}
		<p>
			<input type="radio" name="mood" id="mood-{mood.value}" value={mood.value} />
			<label for="mood-{mood.value}">{mood.name}</label>
			<p>
		{/each}
	</fieldset>
</form>

<style>
	form {
		margin: 5px;
	}
</style>
