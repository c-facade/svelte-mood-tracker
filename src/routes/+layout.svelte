<script lang="ts">
	//import SegmentedButton, {Label, Segment} from '@smui/segmented-button';
	import '../app.css';
  //import {isLoggedIn} from '../userStore';
  import TabBar from '@smui/tab-bar';
	import Tab, {Icon, Label} from '@smui/tab';
	import { errorMessage, openBanner, routes, selectedTab } from '../stores';
	import BottomAppBar, { AutoAdjust, Section } from '@smui-extra/bottom-app-bar';
  import ErrorBanner from '../components/ErrorBanner.svelte';
	
	let bottomAppBar: BottomAppBar;
	let windowWidth: number;	
	$: stackTop = windowWidth < 840;

	const offlineHandler = () => {
	if(Notification.permission === "granted"){
		new Notification("This device is offline", {
			body: "synchronization will resume when it's back online."
		});
	}
	else{
		errorMessage.set({red: false, message:"This device is offline: synchronization will resume when it's back online."});
		openBanner.set(true);
	}
	};

	const onlineHandler = () => {
		if(Notification.permission === "granted"){
			new Notification("Back online: resuming synchronization.");
		}
		else{
			errorMessage.set({red: false, message:"Back online: resuming synchronization."});
			openBanner.set(true);
		}
	};
</script>

<svelte:window bind:outerWidth={windowWidth} on:online={onlineHandler} on:offline={offlineHandler}/>

<header class="mobile">
	<h1 class="jersey-25-regular">
		Mood Tracker
	</h1>
</header>

<header class="desktop">
	<h1 class="jersey-25-regular">
		Mood Tracker
	</h1>
</header>

<TabBar	tabs={[...routes.values()]} let:tab bind:active={$selectedTab} class="top-tavbar">
	<Tab {tab} href={tab.link} minWidth={false} stacked={stackTop}>
		<Icon class="material-icons">{tab.icon}</Icon>
		<Label>{tab.name}</Label>
	</Tab>
</TabBar>

<ErrorBanner />

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
