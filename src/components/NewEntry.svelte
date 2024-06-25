<script lang="ts">
	import { moods, activities, groups, type Activity } from '../activitiesStore';
	import { diary } from '../entriesStore';
	import type { Entry, DiaryPage } from '../entriesStore';
	import type { Mood } from '../activitiesStore';
	import Button from '@smui/button';
	import MenuSurface from '@smui/menu-surface';
    import NewActivity from './NewActivity.svelte';
		import Chip, { Set } from '@smui/chips';
		import EditGroup from './EditGroup.svelte';
		import DeleteGroup from './DeleteGroup.svelte';
    import {routes, selectedTab} from '../stores';
    import {goto} from '$app/navigation';
	import LoadDefault from './LoadDefault.svelte';
    import DateTime from './DateTime.svelte';
    import {get} from 'svelte/store';
	import { entryDate } from '../stores';
    import Textfield from '@smui/textfield';


	let errorActivity : Activity = {
		id: 'zero',
		name: "error",
		symbol: null,
		group: "default",
		archived: false
	};

	let surface: MenuSurface;
	let anchor: HTMLDivElement;
	let chosen : Mood;
	let showIcon = false;
	let entryNote = "";

function addEntry(e : SubmitEvent){
		console.log("Adding");
		let form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		var entries : Entry[] = [];
		if(!chosen){
			alert("Please rate your mood");
			return;
		}
		let mood = chosen.value; 
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
		let note = entryNote == "" ? null : entryNote;
		const date = get(entryDate);
		const page : DiaryPage = {entries, date, note};
		console.log(page)
		diary.addPage(page);
		selectedTab.set(routes.get("diary"));
		goto("/diary");
	}
</script>

<form on:submit|preventDefault={addEntry}>
	<DateTime/>
	<fieldset>
		<legend>How are you today?</legend>
		<div id="moods-container">
		<Set chips={moods} let:chip choice bind:selected={chosen}>
			<Chip {chip} touch>
				<span class="material-symbols-outlined">{chip.symbol}</span>
			<span>{chip.name}</span>
			</Chip>
		</Set>
		</div>
	</fieldset>
	
	<fieldset>
		<legend>What did you do?</legend>
		<div class="groups-container">
			{#each $groups as [name, list]}
				<div class="group">
					<div class="buttons-container">
						<EditGroup {list} {name} {errorActivity}/>
						<DeleteGroup {name}/>
					</div>
					<div class="group-container">
						<h4>{name}</h4>
						<div class="activities-container">
							{#each list.map((id) => ($activities.get(id) ?? errorActivity )) as a}
								<div class="activity-box">
									<input type="checkbox" name={a.name} id={a.id} value={a.id}>
									<label for={a.id}>
										{#if a.symbol && showIcon}
											<span class="material-symbols-outlined">{a.symbol}&ensp;</span>
										{/if}
										{a.name}
									</label>
								</div>
							{/each}
						</div>	
					</div>
				</div>
			{/each}
		</div>
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
		<LoadDefault/>
	</fieldset>
	<fieldset>
		<legend>
			Add a text note
		</legend>
		<Textfield 
			textarea
			style="width: 90%;"
	 		bind:value={entryNote}
	 ></Textfield>
		{entryNote}
	</fieldset>
	<Button variant="raised">OK</Button>
</form>

