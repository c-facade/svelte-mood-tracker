<script lang="ts">
	import '../app.css';

	let routes = ['account', 'about', 'diary', 'settings', 'stats']
</script>

<style>
	nav a{
		padding: 10px;
	}
</style>

<nav>
	<a href="/">home</a>
	{#each routes as r}
		<a href="/{r}">{r}</a>
	{/each}
</nav>
	

<slot></slot>

