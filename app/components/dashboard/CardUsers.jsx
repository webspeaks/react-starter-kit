import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const users = [
	{
		id: 1,
		name: "Alex Johnson",
		email: "alex.johnson@example.com",
		avatar_url: "https://robohash.org/alex",
	},
	{
		id: 2,
		name: "Maria Garcia",
		email: "maria.garcia@example.com",
		avatar_url: "https://robohash.org/maria",
	},
	{
		id: 3,
		name: "Chris Lee",
		email: "chris.lee@example.com",
		avatar_url: "https://robohash.org/chris",
	},
	{
		id: 4,
		name: "Sarah Smith",
		email: "sarah.smith@example.com",
		avatar_url: "https://robohash.org/sarah",
	},
	{
		id: 5,
		name: "David Williams",
		email: "david.williams@example.com",
		avatar_url: "https://robohash.org/david",
	},
	{
		id: 6,
		name: "Laura Brown",
		email: "laura.brown@example.com",
		avatar_url: "https://robohash.org/laura",
	},
	{
		id: 7,
		name: "Michael Jones",
		email: "michael.jones@example.com",
		avatar_url: "https://robohash.org/michael",
	},
	{
		id: 8,
		name: "Jessica Miller",
		email: "jessica.miller@example.com",
		avatar_url: "https://robohash.org/jessica",
	},
	{
		id: 9,
		name: "Daniel Davis",
		email: "daniel.davis@example.com",
		avatar_url: "https://robohash.org/daniel",
	},
	{
		id: 10,
		name: "Emily Wilson",
		email: "emily.wilson@example.com",
		avatar_url: "https://robohash.org/emily",
	},
];

export default function CardUsers() {
	return (
		<Card className='bg-muted'>
			<CardHeader className='px-4 pb-2'>
				{" "}
				<CardTitle>Card B</CardTitle>
				<CardDescription>
					List of users who signed up recently
				</CardDescription>
			</CardHeader>
			<div className='border-0 flex flex-col gap-2'>
				{users.map((user) => (
					<Card key={user.id} className='flex items-center gap-4 p-2 m-1'>
						<div className='w-12 h-12 rounded-sm relative overflow-hidden shrink-0'>
							<img
								src={user.avatar_url}
								alt={user.name}
								height={48}
								width={48}
								className='object-cover w-full h-full'
							/>
						</div>
						<div className='flex flex-col flex-1 min-w-0'>
							<div className='font-medium text-sm'>{user.name}</div>
							<div className='text-xs text-muted-foreground'>
								{user.email}
							</div>
						</div>
					</Card>
				))}
			</div>
		</Card>
	);
}
