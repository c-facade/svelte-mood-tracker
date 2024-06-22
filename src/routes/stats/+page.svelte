<h2 class="main roboto-serif">
Statistics
</h2>

<div>
<img id="line-chart" src="/line-graph.png" alt="line chart" style="width: 40%"/>
</div>
<label for="line-chart">This is an image...</label>

<!-->
<script lang="ts">
	//import { diary } from "../../entriesStore";
	import Preview from '../../layercake-components/Preview.svelte';
	import { createDateSeries } from '../../layercake-components/genData';
	import { scaleTime } from 'd3-scale';
	import { formatDate, PeriodType } from 'svelte-ux';

	import {
		Chart,
		Svg,
		Axis,
		Spline
	} from 'layerchart';

	const dateSeriesData = createDateSeries({ count: 30, min: 50, max: 100, value: 'integer'});

</script>

<Preview data={dateSeriesData}>
  <div class="h-[300px] p-4 border rounded">
    <Chart
      data={dateSeriesData}
      x="date"
      xScale={scaleTime()}
      y="value"
      yDomain={[0, null]}
      yNice
      padding={{ left: 16, bottom: 24 }}
    >
      <Svg>
        <Axis placement="left" grid rule />
        <Axis
          placement="bottom"
          format={(d) => formatDate(d, PeriodType.Day, { variant: 'short' })}
          rule
        />
        <Spline class="stroke-2 stroke-primary" />
      </Svg>
    </Chart>
  </div>
</Preview>
</-->
