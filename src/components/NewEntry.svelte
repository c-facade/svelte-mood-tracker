<script lang="ts">
	import { moods, activities } from '../db';
	import { diary } from '../entriesStore';
	import type { Entry, DiaryPage } from '../entriesStore';
    import NewActivity from './NewActivity.svelte';
	
	function addEntry(e : SubmitEvent){
		console.log("Adding");
		let form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		var entries : Entry[] = [];
		let mood = formData.get("mood");
		const date = new Date()
		if(mood === null){
			alert("You need to say how you feel.");
			return;
		}
		formData.delete("mood");
		entries.push(
		{
			activityName: 'mood',
			activityId: 'Gk39rf',
			value: mood
		});
		for( const [key, value] of formData) {
			entries.push(
			{
				activityName: key,
				activityId: value,
				value: true
			});
		}
		console.log(entries);
		const page : DiaryPage = {entries, date};
		diary.addPage(page);
	}
</script>

<form on:submit|preventDefault={addEntry}>
	<fieldset>
		<legend>How are you today?</legend>
		{#each moods as mood}
		<p>
			<input type="radio" name="mood" id="mood-{mood.value}" value={mood.value} />
			<label for="mood-{mood.value}">{mood.name}</label>
			<p>
		{/each}
	</fieldset>
	
	<fieldset>
		<legend>What did you do?</legend>
		{#each $activities as activity}
			<input type="checkbox" name={activity.name} id={activity.id} value={activity} />
			<label for={activity.id}>{activity.name}</label><br/>
		{/each}
		<NewActivity/>
	</fieldset>

	<button type="submit">OK</button>
</form>

