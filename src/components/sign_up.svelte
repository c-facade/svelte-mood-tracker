<script charset="utf-8" lang="ts">
    import {createEventDispatcher} from "svelte";
	//import { Form, TextInput, PasswordInput, Button }
	
	let dispatch = createEventDispatcher<{signup:{username: string, email: string, password: string}}>()
	let username : string, email : string, password : string;

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
	<input type="text" bind:value={username} placeholder="Enter your username" name="username"id="username-input"/>
	<input type="email" bind:value={email} name="email" id="email-input" placeholder="Enter your email"/>
	
	<input 
	 type="password" 
	 bind:value={password} 
	 name="password" 
   id="password-input" 
   placeholder="Enter your password"
	 />

	 <button on:click={signup}>Sign Up</button>
</form>
