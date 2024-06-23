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



function compareDates(a: DiaryPage, b: DiaryPage) {
	return a.date.getDate() - b.date.getDate();
}

let data = {
	labels: $diary.toSorted(compareDates).map(page => page.date.getDate()),
	color: "white",
	datasets: [
		{
			label: "Moods",
			data: $diary.toSorted(compareDates).map(page => page.entries[0].value as number),
			borderColor: '#1DE9B6',
			borderWidth: 2,
			backgroundColor: '#1DE9B6',
		}
	]
}

const options = {
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			enabled: false
		}
	},
	responsive: true,
	layout: {
		padding: 20
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
