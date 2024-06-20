<script lang="ts">
	import Textfield from "@smui/textfield";
    import {createEventDispatcher} from "svelte";

	export let name : string;
	//export let buttonless = true;
	let editing = false;
	
	let dispatch = createEventDispatcher();

	function closeInput(e : CustomEvent | KeyboardEvent){
		e = e as KeyboardEvent;
		if(e.key == 'Esc'){
			e.preventDefault();
			editing = false;
		}
		if(e.key == 'Enter'){
			e.preventDefault();
			dispatch('edited', name)
			editing = false;
		}
	}
	
	function updateAndClose() {
		dispatch('edited', name)
		editing = false;
	}

</script>

<div class="group-name-container">
	{#if editing}
		<Textfield bind:value={name} input$autofocus on:keyup={closeInput} on:blur={updateAndClose}>
		</Textfield>
	{:else}
		<span role="button" tabindex=0 on:keyup={(e) => {
					if (e.key == "Enter") editing = true
				}} on:click={() => (editing = true)}>
			{name}
		</span>
	{/if}
</div>
