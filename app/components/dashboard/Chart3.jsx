"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive pie chart";

const desktopData = [
	{ month: "january", desktop: 186, fill: "var(--color-january)" },
	{ month: "february", desktop: 305, fill: "var(--color-february)" },
	{ month: "march", desktop: 237, fill: "var(--color-march)" },
	{ month: "april", desktop: 173, fill: "var(--color-april)" },
	{ month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	desktop: {
		label: "Desktop",
	},
	mobile: {
		label: "Mobile",
	},
	january: {
		label: "January",
		color: "var(--chart-1)",
	},
	february: {
		label: "February",
		color: "var(--chart-2)",
	},
	march: {
		label: "March",
		color: "var(--chart-3)",
	},
	april: {
		label: "April",
		color: "var(--chart-4)",
	},
	may: {
		label: "May",
		color: "var(--chart-5)",
	},
};

export default function Chart3() {
	const id = "pie-interactive";
	const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);

	const activeIndex = React.useMemo(
		() => desktopData.findIndex((item) => item.month === activeMonth),
		[activeMonth]
	);
	const months = React.useMemo(
		() => desktopData.map((item) => item.month),
		[]
	);

	return (
		<div className='flex flex-col h-full'>
			<h1 className='mb-4'>Visitors</h1>
			<div className='flex-1'>
				<ChartContainer
					id={id}
					config={chartConfig}
					className='h-full w-full'
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={desktopData}
							dataKey='desktop'
							nameKey='month'
							innerRadius={60}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({ outerRadius = 0, ...props }) => (
								<g>
									<Sector {...props} outerRadius={outerRadius + 10} />
									<Sector
										{...props}
										outerRadius={outerRadius + 25}
										innerRadius={outerRadius + 12}
									/>
								</g>
							)}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-3xl font-bold'
												>
													{desktopData[
														activeIndex
													].desktop.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground'
												>
													Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</div>
		</div>
	);
}
