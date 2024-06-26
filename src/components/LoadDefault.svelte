<script lang="ts">
	import Button from "@smui/button";
	import Dialog, { Title, Content, Actions }from "@smui/dialog";
	import { activities, defaultActivities } from "../activitiesStore";
	import type { Activity } from "../activitiesStore";
	let openImport = false;
	let sel : Activity[] = [];

	function update() {
		console.log(sel);
		activities.updateWith(sel);
	}
		
</script>



<Button on:click$preventDefault ={ () => (openImport=true)}>Load default activities</Button>
	<Dialog bind:open={openImport}>
	<Title>Select the activities you want to import</Title>
		<Content>
		<div class="default-activities-container">
			{#each defaultActivities as [, a]}
				<div class="activity-box">
					<input 
			type="checkbox"
			name="selected"
		 	value={a}
		 	id={a.id}
		 	bind:group={sel}
		 >
			<label for={a.id}>
				{a.name}
			</label>	
		</div>
			{/each}
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
	.default-activities-container {
		display: flex;
		flex-wrap: wrap;
	}

</style>
