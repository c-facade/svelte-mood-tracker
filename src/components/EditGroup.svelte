<script lang="ts">
		import { activities } from "../activitiesStore";
		import IconButton from "@smui/icon-button";
		import ActivityItem from "./ActivityItem.svelte";
		import Dialog, {Title, Content, Actions} from '@smui/dialog';
		import Button from "@smui/button";
		import { cloneActivity} from "../activitiesStore";
		import type { Activity } from "../activitiesStore";
		import GroupEditable from "./GroupEditable.svelte";
		export let list: string[] = [];
		export let name: string = 'error';
		export let errorActivity;

	let open = false;
	
	function update(){
		activities.updateWith(temporary);
	}

	const temporary = list.map((id) => (
		cloneActivity($activities.get(id)) ?? errorActivity)); 
	let editLast = false;
	let temporaryLen = temporary.length;

	let emptyActivity : Activity = {
		symbol: null,
		id: "",
		name: "",
		archived: false,
		group: name
	}

	function openNew(){
		editLast = true;
		temporary.push(cloneActivity(emptyActivity));
	}

	function handleAdded(){
		temporaryLen++;
		editLast = false;
	}

	function changeName(e : CustomEvent){
		name = e.detail;
	}
</script>


<IconButton class="material-symbols-outlined" on:click$preventDefault ={ () => (open=true)}>edit</IconButton>
<Dialog bind:open>
	<Title>Edit Group</Title>
		<Content>
			<h4>
				<GroupEditable name={name} on:edited={changeName}/>
			</h4>
		<div class="activities-container">
			{#each temporary as a, index}
				{#if index == temporaryLen && editLast}
					<ActivityItem activity={a} editing={true} last={true} on:added={handleAdded}/>
				{:else}
					<ActivityItem activity={a} />
				{/if}
			{/each}
			<IconButton class="material-symbols-outlined" on:click$preventDefault={openNew}>add</IconButton>
		</div>
		</Content>

	<Actions>
		<Button on:click$preventDefault={update}>
			OK
		</Button>
		<Button on:click$preventDefault>
			Cancel
		</Button>
	</Actions>
</Dialog>

<style>
	.activities-container {
		display: flex;
		flex-wrap: wrap;
	}

</style>
