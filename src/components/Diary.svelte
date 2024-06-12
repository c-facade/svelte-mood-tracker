<script lang="ts">
	import {moods} from '../db';
	import type { Mood } from '../db';
	import { diary } from '../entriesStore';
	/*
	const getMood = (entries: Entry[]) =>
	{
		if(entries[0].activityName == "mood"){
			let value = entries[0].value;
			const mood : Mood | undefined = moods.find((m) => m.value === value);
			return (mood ? mood.name : 'unknown');
		}
		else{
			return "";
		}
	};
	*/
	const getMood = (value : number | boolean) => {
		if( typeof value == 'boolean') return 'error';
		console.log(value)
		const mood : Mood | undefined = moods.find((m) => m.value == value);
		console.log(mood)
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
