<script lang="ts">
		import { activities } from "../activitiesStore";
    import Textfield from "@smui/textfield";
		import IconButton from "@smui/icon-button";
		import ActivityItem from "./ActivityItem.svelte";
		import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Button from "@smui/button";
		let open = false;
		export let list: string[] = [];
		export let name: string = 'error';
		export let errorActivity;

	function editName(){
	}

	let editing = false;
	
</script>


<IconButton class="material-symbols-outlined" on:click$preventDefault ={ () => (open=true)}>add</IconButton>
	<Dialog bind:open>
		<Title>Edit Group</Title>
		<Content>
			{#if editing}
				<Textfield />
				<IconButton class="material-symbols-outlined" on:click$preventDefault={editName}>check</IconButton>
			{:else}
				<h4>{name}</h4>
			{/if}
			<div class="activities-container">
				{#each list.map((id) =>
					($activities.get(id) ?? errorActivity)) as a}
					<ActivityItem activity={a} />
				{/each}
				<IconButton class="material-symbols-outlined">add</IconButton>
			</div>
		</Content>
		<Actions>
			<Button on:click$preventDefault>
				OK
			</Button>
			<Button on:click$preventDefault>
				Cancel
			</Button>
		</Actions>
	</Dialog>
