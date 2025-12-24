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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
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
import { Progress } from "@/components/ui/progress.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.jsx";

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

						<Separator className='my-6' />

						{/* Stats Overview */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
							<Card>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium'>Total Users</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>1,234</div>
									<p className='text-xs text-muted-foreground'>
										<Badge variant='secondary' className='text-xs'>+12%</Badge> from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium'>Revenue</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>$45,231</div>
									<p className='text-xs text-muted-foreground'>
										<Badge variant='secondary' className='text-xs'>+8%</Badge> from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium'>Orders</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>456</div>
									<p className='text-xs text-muted-foreground'>
										<Badge variant='secondary' className='text-xs'>+23%</Badge> from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium'>Conversion Rate</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>3.2%</div>
									<p className='text-xs text-muted-foreground'>
										<Badge variant='destructive' className='text-xs'>-2%</Badge> from last month
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Recent Activity Table */}
						<Card className='mb-6'>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>Latest user activities and transactions</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>User</TableHead>
											<TableHead>Action</TableHead>
											<TableHead>Time</TableHead>
											<TableHead>Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell>John Doe</TableCell>
											<TableCell>Purchased Product</TableCell>
											<TableCell>2 minutes ago</TableCell>
											<TableCell><Badge variant='secondary'>Completed</Badge></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Jane Smith</TableCell>
											<TableCell>Updated Profile</TableCell>
											<TableCell>5 minutes ago</TableCell>
											<TableCell><Badge variant='secondary'>Success</Badge></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Mike Johnson</TableCell>
											<TableCell>Left Review</TableCell>
											<TableCell>10 minutes ago</TableCell>
											<TableCell><Badge variant='secondary'>Pending</Badge></TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>

						{/* Progress Section */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
							<Card>
								<CardHeader>
									<CardTitle>Project Progress</CardTitle>
									<CardDescription>Current sprint completion status</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div>
										<div className='flex justify-between text-sm mb-1'>
											<span>Design Phase</span>
											<span>85%</span>
										</div>
										<Progress value={85} />
									</div>
									<div>
										<div className='flex justify-between text-sm mb-1'>
											<span>Development</span>
											<span>67%</span>
										</div>
										<Progress value={67} />
									</div>
									<div>
										<div className='flex justify-between text-sm mb-1'>
											<span>Testing</span>
											<span>45%</span>
										</div>
										<Progress value={45} />
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>System Health</CardTitle>
									<CardDescription>Current system status indicators</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<Alert>
										<AlertTitle>Server Status</AlertTitle>
										<AlertDescription>All systems operational. No issues detected.</AlertDescription>
									</Alert>
									<Alert>
										<AlertTitle>Database</AlertTitle>
										<AlertDescription>Database connections are healthy and responsive.</AlertDescription>
									</Alert>
									<div className='flex gap-2'>
										<Button variant='outline' size='sm'>Run Diagnostics</Button>
										<Button variant='outline' size='sm'>View Logs</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent asChild>
						<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
							<CardUsers />

							<Card className='bg-muted'>
								<CardHeader>
									<CardTitle>Quick Actions</CardTitle>
									<CardDescription>
										Common administrative tasks and shortcuts.
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-2'>
									<Button className='w-full justify-start' variant='ghost'>
										📊 Generate Report
									</Button>
									<Button className='w-full justify-start' variant='ghost'>
										👥 Manage Users
									</Button>
									<Button className='w-full justify-start' variant='ghost'>
										⚙️ System Settings
									</Button>
									<Button className='w-full justify-start' variant='ghost'>
										📧 Send Notifications
									</Button>
								</CardContent>
							</Card>

							<Card className='bg-muted'>
								<CardHeader>
									<CardTitle>Notifications</CardTitle>
									<CardDescription>
										Recent alerts and system notifications.
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-3'>
									<Alert>
										<AlertTitle className='text-sm'>New User Registration</AlertTitle>
										<AlertDescription className='text-xs'>
											5 new users joined today
										</AlertDescription>
									</Alert>
									<Alert>
										<AlertTitle className='text-sm'>System Update</AlertTitle>
										<AlertDescription className='text-xs'>
											Scheduled maintenance in 2 hours
										</AlertDescription>
									</Alert>
									<Alert>
										<AlertTitle className='text-sm'>Payment Processed</AlertTitle>
										<AlertDescription className='text-xs'>
											$1,250 payment received
										</AlertDescription>
									</Alert>
								</CardContent>
							</Card>

							<Card className='bg-muted'>
								<CardHeader>
									<CardTitle>Team Activity</CardTitle>
									<CardDescription>
										Current team member statuses and activities.
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-3'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<div className='w-2 h-2 bg-green-500 rounded-full'></div>
											<span className='text-sm'>Sarah Johnson</span>
										</div>
										<Badge variant='secondary' className='text-xs'>Online</Badge>
									</div>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
											<span className='text-sm'>Mike Chen</span>
										</div>
										<Badge variant='outline' className='text-xs'>Away</Badge>
									</div>
									<div className='flex items-center justify-between'>
										<div className='flex items-center justify-between w-full'>
											<div className='flex items-center gap-2'>
												<div className='w-2 h-2 bg-gray-400 rounded-full'></div>
												<span className='text-sm'>Alex Rodriguez</span>
											</div>
											<Badge variant='outline' className='text-xs'>Offline</Badge>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
			</PageContent>
		</Page>
	);
}
