<script lang="ts">
	//import SegmentedButton, {Label, Segment} from '@smui/segmented-button';
	import '../app.css';
  //import {isLoggedIn} from '../userStore';
  import TabBar from '@smui/tab-bar';
	import Tab, {Icon, Label} from '@smui/tab';
	import { routes, selectedTab } from '../stores';
	import BottomAppBar, { AutoAdjust, Section } from '@smui-extra/bottom-app-bar';
	
	let bottomAppBar: BottomAppBar;
</script>

<header>
	<h1 class="jersey-25-regular">
		Mood Tracker
	</h1>
</header>

<TabBar	tabs={[...routes.values()]} let:tab bind:active={$selectedTab} class="top-tavbar">
	<Tab {tab} href={tab.link} minWidth={false}>
		<Icon class="material-icons">{tab.icon}</Icon>
		<Label>{tab.name}</Label>
	</Tab>
</TabBar>

<AutoAdjust {bottomAppBar}>

<slot></slot>

</AutoAdjust>
<!-->
<BottomAppBar
	bind:this={bottomAppBar}
	variant="fixed"
	class="bottom-bar">
	<Section>
		<IconButton class="material-icons">book</IconButton>
		<IconButton class="material-icons">show_chart</IconButton>
	</Section>
	<Section>
		<Fab
	 >
	 <Icon class="material-icons">add</Icon>
	</Fab>
	</Section>
	<Section>
		<IconButton class="material-icons">info</IconButton>
		<IconButton class="material-icons">person</IconButton>
	</Section>
</BottomAppBar>
</-->

<BottomAppBar
	bind:this={bottomAppBar}
	variant="fixed"
	class="bottom-bar">
	<Section>
		<TabBar	
			tabs={[...routes.values()].slice(0)} 
		let:tab 
		bind:active={$selectedTab}
		class="bottom-tavbar"
		>
		<Tab 
			{tab} 
		href={tab.link} 
		stacked={true}
		indicatorSpanOnlyContent={true}
		>
			<Icon class="material-icons">{tab.icon}</Icon>
			<Label>{tab.mobileName}</Label>
		</Tab>
	</TabBar>
	</Section>
</BottomAppBar>

<style>
* :global(.bottom-bar) {
		background-color: #009688;
}
</style>
