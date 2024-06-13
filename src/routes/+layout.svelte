<script lang="ts">
	import '../app.css';
  import {isLoggedIn} from '../userStore';
	let routes = ['about', 'diary', 'settings', 'stats'];

</script>

<style>
	nav a{
		padding: 10px;
	}
</style>

<nav>
	<a href="/">home</a>
	{#if $isLoggedIn}
		{#each routes as r}
			<a href="/{r}">{r}</a>
		{/each}
	{/if}
	<a href="/account">account</a>
</nav>
	

<slot></slot>

