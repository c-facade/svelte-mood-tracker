
<script>
import Banner, {Label, Icon} from "@smui/banner";
import { errorMessage, openBanner } from "../stores";
import Button from "@smui/button";
</script>

<Banner class="icon-color"
	 bind:open={$openBanner}
	 centered
	>
	<Icon class="material-icons" slot="icon">error</Icon>
	<Label slot="label">
		 {$errorMessage}
	 </Label>
	 <svelte:fragment slot="actions">
			<Button>OK</Button>
	 </svelte:fragment>
</Banner>

