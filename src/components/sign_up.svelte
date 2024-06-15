<script charset="utf-8" lang="ts">
    import {createEventDispatcher} from "svelte";
	//import { Form, TextInput, PasswordInput, Button }
	import Textfield from '@smui/textfield';
    import Button from "@smui/button";

	let dispatch = createEventDispatcher<{signup:{username: string, email: string, password: string}}>()
	let username : string = "";
	let email : string = "";
	let password : string = "";

	function signup() {
		console.log("sign_up!");
		dispatch("signup", {
			username,
			email,
			password
		})
	}
</script>

<form>
	<h3>Sign Up</h3>
	
	<Textfield variant="outlined" bind:value={username} label="Username" class="my-textfield">
	</Textfield>

	<Textfield variant="outlined" bind:value={email} label="Email" type="email" class="my-textfield">
	</Textfield>
	
	<Textfield variant="outlined" bind:value={password} label="Password" type="password" class="my-textfield">
	</Textfield>

	 <Button on:click={signup}>Sign Up</Button>
</form>

<style>
	form {
		max-width: 500px;
		padding: 10px;
		align-items: center;
	}
	form :global(.my-textfield){
		margin: 5px;
		min-width: 80%;
	}

	h3 {
		margin: 10px 0;
		padding-bottom: 10px;
	}
</style>

