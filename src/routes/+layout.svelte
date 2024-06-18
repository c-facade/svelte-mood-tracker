<script lang="ts">
	//import SegmentedButton, {Label, Segment} from '@smui/segmented-button';
	import '../app.css';
  //import {isLoggedIn} from '../userStore';
  import TabBar from '@smui/tab-bar';
	import Tab, {Label} from '@smui/tab';
	import { routes, selectedTab } from '../stores';
</script>


<TabBar	tabs={[...routes.values()]} let:tab bind:active={$selectedTab}>
	<!--><a href={tab.link} style="text-decoration: none;"></-->
	<Tab {tab} href={tab.link} minWidth={false}>
		<Label>{tab.name}</Label>
	</Tab>
	<!-->
	 </a>
	 </-->
</TabBar>

<slot></slot>
