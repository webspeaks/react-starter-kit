"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

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
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
};

export default function Component() {
	return (
		<div className='flex flex-col h-full'>
			<h1 className='mb-4'>Sale</h1>
			<div className='flex-1'>
				<ChartContainer config={chartConfig} className='h-full w-full'>
					<BarChart accessibilityLayer data={chartData}>
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar
							dataKey='desktop'
							fill='var(--color-desktop)'
							radius={4}
						/>
						<Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
					</BarChart>
				</ChartContainer>
			</div>
		</div>
	);
}
