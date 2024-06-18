<script lang="ts">
	import { moods, activities, groups, type Activity } from '../activitiesStore';
	import { diary } from '../entriesStore';
	import type { Entry, DiaryPage } from '../entriesStore';
  import NewActivity from './NewActivity.svelte';
	import Wrapper from '@smui/touch-target';

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
			value: Number(mood)
		});
		for( const [key, value] of formData) {
			entries.push(
			{
				activityName: key,
				activityId: String(value),
				value: true
			});
		}
		console.log(entries);
		const page : DiaryPage = {entries, date};
		diary.addPage(page);
	}

	let errorActivity : Activity = {
		id: 'zero',
		name: "error",
		symbol: null,
		group: "default"
	};
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
		<div class="groups-container">
			{#each $groups as [name, list]}
				<div class="group">
					<h4>{name}</h4>
					<div class="activities-container">
						{#each list.map((id) => ($activities.get(id) ?? errorActivity )) as a}
							<Wrapper>
								<input type="checkbox" name={a.name} id={a.id} value={a.id}>
								<label for={a.id}>
									{#if a.symbol}
										<span class="material-symbols-outlined">{a.symbol}</span>
									{/if}
									&ensp;{a.name}
								</label>
							</Wrapper>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<!-->
		{#each $activities as [, activity]}
			<Wrapper>
				<input type="checkbox" name={activity.name} id={activity.id} value={activity.id} />
				<label for={activity.id}><span class="material-symbols-outlined">{activity.symbol}</span>&ensp;{activity.name}</label>
			</Wrapper>
		{/each}
		</-->
		<!-->
		{#each $activities as [, activity]}
			<input type="checkbox" name={activity.name} id={activity.id} value={activity.id} />
			<label for={activity.id}>{activity.name}</label><br/>
		{/each}
		</-->
		<NewActivity/>
	</fieldset>

	<button type="submit">OK</button>
</form>

