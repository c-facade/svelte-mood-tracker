<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  let email : string, password : string;
	const dispatcher = createEventDispatcher<{login:{email: string, password: string}}>()
	function login() {
		dispatcher('login', {
			email,
			password
   	})
  }
</script>
<div class="form-container">
    <form>
        <input bind:value={email} type="email" placeholder="Enter your email" name="email"/>
        <input
            bind:value={password}
            placeholder="Enter password"
            name="password"
        />
        <div class="space"></div>
        <button on:click={login}>Sign In</button>
		</form>
</div>

