<script lang="ts">
    import Wrapper from "@smui/touch-target";
import type {Activity} from "../activitiesStore";
    import IconButton from "@smui/icon-button";
    import Textfield from "@smui/textfield";
	export let activity : Activity;
	let editing = false;
</script>

<Wrapper>
	{#if editing}
		<Textfield>
		</Textfield>
	{:else}
		{#if activity.symbol}
			<span class="material-symbols-outlined">{activity.symbol}</span>
		{/if}
		{activity.name}
		<IconButton class="material-symbols-outlined" on:click$preventDefault>edit</IconButton>
		<IconButton on:click$preventDefault class="material-symbols-outlined">delete</IconButton>
	{/if}
</Wrapper>
