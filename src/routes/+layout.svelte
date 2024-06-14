<script lang="ts">
	//import SegmentedButton, {Label, Segment} from '@smui/segmented-button';
	import '../app.css';
  //import {isLoggedIn} from '../userStore';
  import TabBar from '@smui/tab-bar';
	import Tab, {Label} from '@smui/tab';
	import { routes, selectedTab } from '../stores';
</script>


<TabBar	tabs={routes} let:tab bind:active={$selectedTab}>
	<a href={tab.link} style="text-decoration: none;">
	<Tab {tab}>
		<Label>{tab.name}</Label>
	</Tab>
	</a>
</TabBar>

<main>
<slot></slot>
</main>
