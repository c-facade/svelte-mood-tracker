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
		onAuthStateChanged(auth, (user) => {
			if(user){
				isLoggedIn.set(1);
				diary.updateFromFirestore();
				console.log($diary);
			}
			else{
				isLoggedIn.set(-1);
			}
		});
	});
	
	const getMood = (value : number | boolean) => {
		if( typeof value == 'boolean') return 'error';
		const mood : Mood | undefined = moods.find((m) => m.value == value);
		return ((mood != undefined) ? mood.name : 'unknown');
	};

</script>

{#if $isLoggedIn>0}
{#each $diary as diarypage}
	<div class="diary-page">
		<h4 class="diary-date">{diarypage.date.toLocaleDateString()} {diarypage.date.toLocaleTimeString([], {timeStyle: "short"})}</h4>
		{#if diarypage.entries[0].activityName == 'mood'}
			<h3 class="mood">{getMood(diarypage.entries[0].value)}</h3>
		{/if}
		<div class="entries-container">
			{#each diarypage.entries.slice(1) as entry}
				{#if entry.activityName == 'mood'}
					<h3 class="mood">{getMood(entry.value)}</h3>
				{:else}
					<p class="entry">{entry.activityName}</p>
				{/if}
			{/each}
		</div>
		{#if diarypage.note}
			<div style="padding-left: 10px; margin: 5px;" class="diary-note">
					{diarypage.note}
			</div>
		{/if}
	</div>
{:else}
	{#if $isLoggedIn != 0}
		<div class="diarypage">Your entries will be shown here.</div>
	{:else}
		<LinearProgress indeterminate />
	{/if}
{/each}
{:else if $isLoggedIn < 0}
	<div class="diarypage">Your entries will be shown here</div>
{:else}
	<LinearProgress indeterminate />
{/if}

<style>
</style>
