<nav>
	<a href="/">Home</a>
	<a href="/stats">Statistics</a>
	<a href="/settings">Settings</a>
	<a href="/about">About</a>
</nav>

<div style="margin: 5px; margin-left: 15px;">
	<slot></slot>
</div>

<style>
	nav {
		background-color: lightgrey;
		display: flex;
		margin: 0px;
		padding: 5px;
		justify-content: space-around;
	}
	a {
		color: black;
		text-transform: uppercase;
		text-decoration: none;
	}
	a:hover{
		color: grey;
	}
</style>

