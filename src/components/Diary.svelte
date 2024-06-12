<script lang="ts">
	import {moods} from '../db';
	import type { Mood } from '../db';
	import type { Entry } from '../entriesStore';
	import { diary } from '../entriesStore';
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
</script>

{#each $diary as diarypage}
	<h2>{getMood(diarypage.entries)}</h2>
	<h3>{diarypage.date.toLocaleDateString()}</h3>
	{#each diarypage.entries as entry}

		<p>{entry.activityName}</p>
	{/each}
{:else}
	Your entries will be shown here
{/each}
