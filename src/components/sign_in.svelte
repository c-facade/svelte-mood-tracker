<script lang="ts">
	import Textfield from '@smui/textfield';
	import Button, {Label} from '@smui/button';
import { createEventDispatcher } from 'svelte';
	let email : string = "";
	let password : string = "";
	const dispatcher = createEventDispatcher<{login:{email: string, password: string}}>()
	function login() {
		dispatcher('login', {
			email,
			password
   	})
  }
</script>

<form>
	<h3>Login</h3>

	<Textfield variant="outlined" bind:value={email} type="email" placeholder="Enter your email" class="my-textfield"/>

	<Textfield variant="outlined" bind:value={password} type="password" placeholder="Enter password" class="my-textfield"/>

	<Button on:click={login}>
	<Label>Sign In</Label>
	</Button>	

</form>

<style>
	form {
		max-width: 500px;
		padding: 10px;
		align-items: center;
	}
	form :global(.my-textfield) {
		margin: 5px;
		min-width: 80%;
	}
	
	h3 {
		margin: 10px 0;
		padding-bottom: 10px;
	}


</style>

