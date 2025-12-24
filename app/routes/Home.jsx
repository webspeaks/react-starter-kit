export function meta() {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

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
						<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
							<Card className='bg-muted'>
								<CardHeader>
									<CardTitle>Card A</CardTitle>
									<CardDescription>
										Some example text to fill space.
									</CardDescription>
								</CardHeader>
							</Card>

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
