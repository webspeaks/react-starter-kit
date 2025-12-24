export function meta() {
	return [
		{ title: "React Starter Kit" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

import CardUsers from "@/components/dashboard/CardUsers";
import Chart1 from "@/components/dashboard/Chart1";
import Chart2 from "@/components/dashboard/Chart2";
import Chart3 from "@/components/dashboard/Chart3";
import Chart4 from "@/components/dashboard/Chart4";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.jsx";
import {
	Page,
	PageContent,
	PageDescription,
	PageHeader,
	PageTitle,
} from "@/components/ui/page.jsx";

export default function Home() {
	return (
		<Page>
			<PageHeader>
				<div className='space-y-2'>
					<PageTitle>Home</PageTitle>
					<PageDescription>
						This is a demo placeholder page.
					</PageDescription>
				</div>
			</PageHeader>

			<PageContent>
				<Card>
					<CardHeader>
						<CardTitle>Dummy content</CardTitle>
						<CardDescription>
							Replace this section with your real homepage content. For
							now it includes a couple of blocks to show spacing and
							typography.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-2 items-stretch'>
							<Chart1 />
							<Chart2 />
							<Chart3 />
							<Chart4 />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent asChild>
						<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-2'>
							<CardUsers />

							<Card className='bg-muted'>
								<CardHeader>
									<CardTitle>Card B</CardTitle>
									<CardDescription>
										Another block of placeholder content.
									</CardDescription>
								</CardHeader>
							</Card>

							<Card className='bg-muted'>
								<CardHeader>
									<CardTitle>Card C</CardTitle>
									<CardDescription>
										One more card so the layout looks like a
										dashboard.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>
					</CardContent>
				</Card>
			</PageContent>
		</Page>
	);
}
