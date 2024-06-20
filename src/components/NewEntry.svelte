<script lang="ts">
	import { moods, activities, groups, type Activity } from '../activitiesStore';
	import { diary } from '../entriesStore';
	import type { Entry, DiaryPage } from '../entriesStore';
	import type { Mood } from '../activitiesStore';
	import Wrapper from '@smui/touch-target';
	import Button from '@smui/button';
	import MenuSurface from '@smui/menu-surface';
    import NewActivity from './NewActivity.svelte';
		import Chip, { Set } from '@smui/chips';
		import EditGroup from './EditGroup.svelte';
		import DeleteGroup from './DeleteGroup.svelte';

	function addEntry(e : SubmitEvent){
		console.log("Adding");
		let form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		var entries : Entry[] = [];
		if(!chosen) alert("You need to say how you feel.");
		let mood = chosen.value; 
		/*formData.get("mood");
		if(mood === null){
			alert("You need to say how you feel.");
			return;
		}
		formData.delete("mood");
		*/
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
		const date = new Date();
		const page : DiaryPage = {entries, date};
		diary.addPage(page);
	}

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
</script>

<form on:submit|preventDefault={addEntry}>
	<fieldset>
		<legend>How are you today?</legend>
		<div id="moods-container">
		<Set chips={moods} let:chip choice bind:selected={chosen}>
			<Chip {chip} touch>
				<span class="material-symbols-outlined">{chip.symbol}</span><span>{chip.name}</span>
			</Chip>
		</Set>
		</div>
	</fieldset>
	
	<fieldset>
		<legend>What did you do?</legend>
		<div class="groups-container">
			{#each $groups as [name, list]}
				<div class="group">
					<div class="group-row">
						<h4>{name}</h4>
						<div class="buttons-container">
							<EditGroup {list} {name} {errorActivity}/>
							<DeleteGroup {name}/>
						</div>
					</div>
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
	</fieldset>
	<Button variant="raised">OK</Button>
</form>

<style>
	#moods-container .material-symbols-outlined {
		font-size:60px;
	}

	.group-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>

