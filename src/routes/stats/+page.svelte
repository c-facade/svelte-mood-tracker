<script>
    import {onMount} from "svelte";
    import SimpleChart from "../../components/SimpleChart.svelte";
    import {onAuthStateChanged} from "firebase/auth";
    import {auth} from "../../firebase";
    import {diary} from "../../entriesStore";
		import { isLoggedIn } from "../../userStore";
		import { fade } from 'svelte/transition';
    import LinearProgress from "@smui/linear-progress";

	onMount( () => {
		onAuthStateChanged(auth, (user) => {
			if(user){
				isLoggedIn.set(1);
				diary.updateFromFirestore();
			}
			else{
				isLoggedIn.set(-1);
			}
		})
	});
	
</script>

<h2>
Statistics
</h2>

{#if $diary[0] && $isLoggedIn>0}
	<SimpleChart />
{:else if $isLoggedIn == 0}
	<LinearProgress indeterminate/>
{:else if $isLoggedIn>0}
	<p in:fade={{delay: 1000}}>
	<a href="/diary">Add a new entry</a> to see statistics.
	</p>
{:else}
	<p>
	<a href="/account">Log in</a> to see statistics.
	</p>
{/if}

