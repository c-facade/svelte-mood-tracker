<script lang="ts">
	//import SegmentedButton, {Label, Segment} from '@smui/segmented-button';
	import '../app.css';
  //import {isLoggedIn} from '../userStore';
	import TopAppBar from '@smui/top-app-bar';
  import TabBar from '@smui/tab-bar';
	import Tab, {Label} from '@smui/tab';
	import { routes, selectedTab } from '../db';
</script>

<div class="top-app-bar-container">
<TopAppBar variant="static" color="primary" dense>
</TopAppBar>
</div>

<TabBar	tabs={routes} let:tab bind:active={$selectedTab}>
	<a href={tab.link} style="text-decoration: none;">
	<Tab {tab}>
		<Label>{tab.name}</Label>
	</Tab>
	</a>
</TabBar>

<p>{$selectedTab.name}</p>
<!-->
<SegmentedButton segments={routes} let:segment key={(segment) => segment.name} singleSelect bind:selected>
	<a href={segment.link}>
	<Segment {segment} disabled={!isLoggedIn}>
		<Label>
			{segment.name}
		</Label>
	</Segment>
	</a>
</SegmentedButton>
</-->

<!-->
<nav>
	<a href="/">home</a>
	{#if $isLoggedIn}
		{#each routes as r}
			<a href="/{r}">{r}</a>
		{/each}
	{/if}
	<a href="/account">account</a>
</nav>
</-->

<slot></slot>

