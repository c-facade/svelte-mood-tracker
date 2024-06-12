<script lang="ts">
	import { activities } from '../db';

	let newActivity = "";

	function addActivity() {
		if(newActivity != ""){
			activities.addActivity(newActivity);
			}
		newActivity = "";
	}
</script>


<form class="insert">
	<legend>Add a new activity</legend>
	<input type="text" placeholder="Swim" bind:value={newActivity}/>
	<button on:click={addActivity}>Add</button>
</form>
