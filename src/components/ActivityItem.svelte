<script lang="ts">
    import {createEventDispatcher} from "svelte";
import type {Activity} from "../activitiesStore";
	import Textfield from "@smui/textfield";
	export let activity : Activity;
	export let editing = false;
	export let last = false;
	let name = activity.name;
	let container : HTMLDivElement;

	const dispatch = createEventDispatcher();

	function deleteActivity(){
		activity.archived = true;
		if(container)
			container.parentNode!.removeChild(container);
	}
	function closeInput(e : CustomEvent | KeyboardEvent){
		e = e as KeyboardEvent;
		if(e.key == 'Esc'){
			e.preventDefault();
			editing = false;
		}
		if(e.key == 'Enter'){
			e.preventDefault();
			if(last){
				dispatch('added');
				last = false;
			}
			activity.name = name;
			editing = false;
		}
	}
	
	function updateAndClose() {
		activity.name = name;
		if(last){
			dispatch('added');
			last = false;
		}
		editing = false;
	}


</script>

<div class="activity-container" bind:this={container}>
	{#if editing}
		<Textfield placeholder={activity.name} bind:value={name} input$autofocus on:keyup={closeInput} on:blur={updateAndClose}>
		</Textfield>
	{:else}
		{#if activity.symbol}
			<span class="material-symbols-outlined">{activity.symbol}</span>
		{/if}
		<span role="button" tabindex=0 on:keyup={(e) => {
					if (e.key == "Enter") editing = true
				}} on:click={() => (editing = true)}>
			{activity.name}
			</span>
			<button class="simple-button" type="button" on:click={deleteActivity}><span aria-label="delete">&#9747;</span></button>	
	{/if}
</div>

<style>
	.activity-container {
		padding: 5px;
		margin: 4px;
		display: inline;
		background-color: #00695C;
		border-radius: 10px;
	}

	.material-symbols-outlined {
		display: inline-flex;
		vertical-align: top;
		font-size: 20px !important;
	}

</style>
