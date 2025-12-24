"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked area chart";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--chart-2)",
	},
};

export default function Chart2() {
	return (
		<div className='flex flex-col h-full'>
			<h1 className='mb-4'>Traffic</h1>
			<div className='flex-1'>
				<ChartContainer config={chartConfig} className='h-full w-full'>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dot' />}
						/>
						<Area
							dataKey='mobile'
							type='natural'
							fill='var(--color-mobile)'
							fillOpacity={0.4}
							stroke='var(--color-mobile)'
							stackId='a'
						/>
						<Area
							dataKey='desktop'
							type='natural'
							fill='var(--color-desktop)'
							fillOpacity={0.4}
							stroke='var(--color-desktop)'
							stackId='a'
						/>
					</AreaChart>
				</ChartContainer>
			</div>
		</div>
	);
}
