<script lang="ts">
    import {onMount} from 'svelte';
	import {moods} from '../activitiesStore';
	import type { Mood } from '../activitiesStore';
	import { diary } from '../entriesStore';
    import {onAuthStateChanged} from 'firebase/auth';
	import { auth } from '../firebase';
	import LinearProgress from '@smui/linear-progress'
	import { isLoggedIn } from '../userStore';

	// TODO style uppercase and or add symbols
	
	onMount( () => {
		onAuthStateChanged(auth, () => {
			diary.updateFromFirestore();
			}
			);
	});
	
	const getMood = (value : number | boolean) => {
		if( typeof value == 'boolean') return 'error';
		const mood : Mood | undefined = moods.find((m) => m.value == value);
		return ((mood != undefined) ? mood.name : 'unknown');
	};

</script>

{#each $diary as diarypage}
	<div class="diary-page">	
		<h3 class="diary-date">{diarypage.date.toLocaleDateString()}</h3>
		{#if diarypage.entries[0].activityName == 'mood'}
			<h2 class="mood">{getMood(diarypage.entries[0].value)}</h2>
		{/if}
		<div class="entries-container">
			{#each diarypage.entries.slice(1) as entry}
				{#if entry.activityName == 'mood'}
					<h2 class="mood">{getMood(entry.value)}</h2>
				{:else}
					<p class="entry">{entry.activityName}</p>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	{#if $isLoggedIn}
	Your entries will be shown here
	{:else}
		<LinearProgress indeterminate />
	{/if}
{/each}

<style>
</style>
