<script lang="ts">
	import { activities } from '../activitiesStore';

	let newActivity = "";

	function add() {
		if(newActivity != ""){
			activities.addActivity(newActivity);
			console.log($activities)
			}
		newActivity = "";
	}
</script>


<form class="insert">
	<legend>Add a new activity</legend>
	<input type="text" placeholder="Swim" bind:value={newActivity}/>
	<button on:click|preventDefault={add}>Add</button>
</form>
