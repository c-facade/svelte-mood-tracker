
<script>
import Banner, {Label, Icon} from "@smui/banner";
import { errorMessage, openBanner } from "../stores";
import Button from "@smui/button";
</script>

<Banner class={$errorMessage.red ? "icon-color-red" : "icon-color-primary"}
	 bind:open={$openBanner}
	 centered
	>
	<Icon class="material-icons" slot="icon">error</Icon>
	<Label slot="label">
		 {$errorMessage.message}
	 </Label>
	 <svelte:fragment slot="actions">
			<Button>OK</Button>
	 </svelte:fragment>
</Banner>

