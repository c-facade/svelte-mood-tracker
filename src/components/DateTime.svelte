<script>
	import { entryDate } from "../stores";
	entryDate.set(new Date());
	let datestring = $entryDate.toISOString().slice(0, 16);
	console.log(datestring);
	let editing = false;

	function updateDate(){
		entryDate.set(new Date(datestring));
		editing = false;
	}
</script>

<div class="datetime" style="align-self: end;">
	{#if editing}
		<input type="datetime-local" bind:value={datestring} id="datetime">
		<button class="simple-button" type="button" on:click={updateDate}><span class="material-symbols-outlined">check</span></button>
	{:else}
		<div
		style="text-align:end;"
			class="diary-date form-date" 
			 role="button" 
				tabindex=0 
				on:keyup={(e) =>
				{
					if (e.key == "Enter") editing = true }}
				on:click={() => (editing = true)}
				>
				{$entryDate.toLocaleDateString()}, {$entryDate.toLocaleTimeString([], {timeStyle: "short"})}
			</div>
	{/if}
</div>
