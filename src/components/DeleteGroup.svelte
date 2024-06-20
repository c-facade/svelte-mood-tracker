<script lang="ts">
	import Dialog, {Title, Content, Actions} from "@smui/dialog";
	import IconButton from "@smui/icon-button";
	import Button from "@smui/button";
	import { activities } from "../activitiesStore";
	export let name : string;
	let open = false;

	function deleteGroup(){
		activities.deleteGroup(name);
	}
</script>



<IconButton 
	class="material-symbols-outlined"
 on:click$preventDefault={() => open=true}
						>
						delete
</IconButton>

<Dialog bind:open >
	<Title>Delete Group?</Title>
	<Content>
		This action will delete the group <strong>{name}</strong> and all of its activities.
	</Content>
	<Actions>
		<Button variant="unelevated" class="red" on:click$preventDefault={deleteGroup}>OK</Button>
		<Button variant="unelevated" on:click$preventDefault>Cancel</Button>
		</Actions>
</Dialog>
