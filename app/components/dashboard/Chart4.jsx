"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with a label";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
};

export default function Chart4() {
	return (
		<div className='flex flex-col h-full'>
			<h1 className='mb-4'>Browser Usage</h1>
			<div className='flex-1'>
				<ChartContainer config={chartConfig} className='h-full w-full'>
					<RadialBarChart
						data={chartData}
						startAngle={-90}
						endAngle={380}
						innerRadius={30}
						outerRadius={110}
					>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent hideLabel nameKey='browser' />
							}
						/>
						<RadialBar dataKey='visitors' background>
							<LabelList
								position='insideStart'
								dataKey='browser'
								className='fill-white capitalize mix-blend-luminosity'
								fontSize={11}
							/>
						</RadialBar>
					</RadialBarChart>
				</ChartContainer>
			</div>
		</div>
	);
}
