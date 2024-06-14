<script charset="utf-8" lang="ts">
    import {createEventDispatcher} from "svelte";
	//import { Form, TextInput, PasswordInput, Button }
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

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
	
	<Textfield variant="outlined" bind:value={username} label="Username">
		<HelperText slot="helper">Insert your username</HelperText>
	</Textfield>

	<Textfield variant="outlined" bind:value={email} label="Email" type="email">
		<HelperText slot="helper">Insert your email</HelperText>
	</Textfield>
	
	<Textfield variant="outlined" bind:value={password} label="Password" type="password">
		<HelperText slot="helper">Insert a secure password</HelperText>
	</Textfield>

	 <button on:click={signup}>Sign Up</button>
</form>

<style>
	form {
		max-width: 500px;
		padding: 25px;
	}
	form label {
		margin: 10px auto;
	}

	h3 {
		margin: 10px auto;
		padding-bottom: 5px;
	}
</style>

