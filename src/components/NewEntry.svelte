<script lang="ts">
	import { moods, activities, groups, type Activity } from '../activitiesStore';
	import { diary } from '../entriesStore';
	import type { Entry, DiaryPage } from '../entriesStore';
	import Wrapper from '@smui/touch-target';
	import Button from '@smui/button';
	import MenuSurface from '@smui/menu-surface';
    import NewActivity from './NewActivity.svelte';

	function addEntry(e : SubmitEvent){
		console.log("Adding");
		let form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		var entries : Entry[] = [];
		let mood = formData.get("mood");
		const date = new Date();
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

	let surface: MenuSurface;
	let anchor: HTMLDivElement;
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
	</fieldset>
	<div class="open-menu-button mdc-menu-surface--anchor" bind:this={anchor}>
		<Button on:click$preventDefault={() =>
					surface.setOpen(true)
					}
		>Add Activity
	</Button>
<MenuSurface bind:this={surface} anchor={false} bind:anchorElement={anchor}>
	<NewActivity surface={surface}/>
</MenuSurface>
	</div>
	<button type="submit">OK</button>
</form>

