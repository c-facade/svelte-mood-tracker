<script lang="ts">
    import {onMount} from 'svelte';
	import {moods} from '../db';
	import type { Mood } from '../db';
	import { diary } from '../entriesStore';
    import {onAuthStateChanged} from 'firebase/auth';
	import { auth } from '../firebase';
	
	onMount( () => {
		onAuthStateChanged(auth, () => {
			console.log($diary);
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
	<h3>{diarypage.date.toLocaleDateString()}</h3>
	{#each diarypage.entries as entry}
		{#if entry.activityName == 'mood'}
			<h2 class="mood">{getMood(entry.value)}</h2>
		{:else}
			<p class="entry">{entry.activityName}</p>
		{/if}
	{/each}
{:else}
	Your entries will be shown here
{/each}
