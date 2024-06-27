<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { diary, type DiaryPage } from '../entriesStore';
	
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
	);

interface Day{
	day: number;
	value: number;
	num: number;
}

function compareDates(a: DiaryPage, b: DiaryPage) {
	return a.date.getDate() - b.date.getDate();
}

function sameMonth(today : Date, pageDay: Date){
	if(today.getFullYear() !== pageDay.getFullYear()){
		return false;
	}
	if(today.getMonth() !== pageDay.getMonth()){
		return false;
	}
	return true
}

function populateData() {
	const pages = $diary.toSorted(compareDates);
	const today = new Date();
	const map : Map<number, Day> = new Map([]);
	for(let page of pages){
		if(!sameMonth(today, page.date)){
			continue;
		}
		const currentDay = page.date.getDate();
		if(map.has(currentDay)){
			let x : Day = map.get(currentDay)!;
			x.value = (x.value + (page.entries[0].value as number)) / x.num+1;
			if(isNaN(x.value)) x.value = 1;
			x.num++;
		}
		else{
			map.set(page.date.getDate(), {
				day: page.date.getDate(),
				value: page.entries[0].value as number,
				num: 1,
			});
		}
	}
	return Array.from(map.values());
}

const daysDataset = populateData();

let data = {
	labels: daysDataset.map((d : Day) => d.day),
	color: "white",
	datasets: [
		{
			label: "Your daily moods",
			data: daysDataset.map((d: Day) => d.value),
			borderColor: '#1DE9B6',
			borderWidth: 2,
			backgroundColor: '#1DE9B6',
		}
	]
}

const options = {
	plugins: {
		tooltip: {
			enabled: false
		}
	},
	responsive: true,
	layout: {
		padding: 30
		}
}

ChartJS.defaults.color = 'white';

</script>

<Line {data} {options} class="chart"/>

<style>
	:global(.chart){
		background-color: #172329;
	}
</style>
