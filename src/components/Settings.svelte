<script lang="ts">
    import Button from "@smui/button";
    import FormField from "@smui/form-field";
    import Switch from "@smui/switch";
		import { errorMessage } from "../stores";
		import { openBanner } from "../stores";
		import { mobileNotification, registerPeriodicNotifications, removePeriodicNotifications } from "$lib/notifications";
    import {onMount} from "svelte";
		import { userSettings } from "../userStore";

	onMount(() => {
		if("Notification" in window) {
			if(Notification.permission === "granted"){
				//granted = true;
				disableOnline = false;
				disablePeriodic = false;
				if($userSettings.onlineNotifications){
					console.log("online notifications allowed");	
				}
				if($userSettings.periodicNotifications){
					registerPeriodicNotifications();
				}
			}
		}
	});

	let onlineNotifications : boolean = $userSettings.onlineNotifications;
	let periodicNotifications : boolean = $userSettings.periodicNotifications;
	let disableOnline : boolean = true;
	let disablePeriodic : boolean = true;

	function askPermission() {
		if(!("Notification" in window)) {
			errorMessage.set({red: false, message: "This browser does not support desktop notifications"});
			openBanner.set(true);
		}
		else if(Notification.permission === "granted") {
			var notification = new Notification("Notifications are allowed");
			console.log(notification);
			mobileNotification("Notifications are allowed");
			disableOnline = false;
			disablePeriodic = false;
		}
		else if(Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					var notification = new Notification("You allowed notifications.");
					console.log(notification);
					mobileNotification("You allowed notifications");
					disableOnline = false;
					disablePeriodic = false;
				}
			});
		}
		else{
			errorMessage.set({
				message: "To receive notifications, allow notifications from this website on the top bar of your browser.",
				red: false
			}
			);
			openBanner.set(true);
		}
	}

	function toggleOnlineNotifications(){
		if(Notification.permission !== "granted"){
			alert("You have to allow notifications.");
			onlineNotifications = false;
			return;
		}
		if(!onlineNotifications){
			userSettings.setOnlineNotifications(true);
			var notification = new Notification("You will be notified when the online status changes");
			console.log(notification);
		}
		else{
			userSettings.setOnlineNotifications(false);
			console.log("Disabled Online notifications");
		}
	}

	function togglePeriodicNotifications() {
		if(Notification.permission !== "granted"){
			alert("You have to allow notifications.");
			periodicNotifications = false;
			return;
		}
		if(!periodicNotifications){
			try{	
				registerPeriodicNotifications();
				userSettings.setPeriodicNotifications(true);
				var notification = new Notification("You will be notified once a day");
				console.log(notification.title);
			}
			catch(e) {
				var notification = new Notification("Your browser doesn't support periodic sync");
				console.log(e, notification.title);
			}
		}
		else{
			removePeriodicNotifications();
			userSettings.setPeriodicNotifications(false);
			console.log("Disabled Periodic notifications");
		}
	}

</script>
<div class="notifications container" style="text-align: start;">
	<h3>Notification settings</h3>
	<Button on:click={askPermission}>Allow notifications</Button>
	<FormField>
		<Switch bind:checked={onlineNotifications} bind:disabled={disableOnline} on:click={toggleOnlineNotifications}>
		</Switch>
		<span slot="label">Send notifications when online status changes.</span>
	</FormField	>
	<p>
	This will notify you when the device is online or offline, so that you know wether your data is synchronized between devices.
	</p>
	<FormField>
		<Switch bind:checked={periodicNotifications} bind:disabled={disablePeriodic} on:click={togglePeriodicNotifications}>
		</Switch>
		<span slot="label">Remind me to add a new entry</span>
	</FormField>
	{periodicNotifications}
	<p>
	If you enable this option, you will receive a notification once a day reminding you to track your mood.
	This will only work if you install this progressive web app on your device.
	</p>
</div>
