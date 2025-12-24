import { NavLink } from "react-router";
import { User2, ChevronUp } from "lucide-react";

import { useSelector } from "react-redux";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { sidebarMenu as items } from "../../config/sidebarMenu";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { User } from "lucide-react";

export default function AppSidebar() {
	const user = useSelector((state) => state.auth.user);

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<NavLink to='/' className='flex items-center'>
								<img
									src='/logo_lg.svg'
									alt='Logo'
									height={40}
									width={180}
									className='h-8 w-auto group-data-[collapsible=icon]:hidden'
								/>
								<img
									src='/logo.svg'
									alt='Logo'
									height={32}
									width={32}
									className='h-8 w-8 hidden group-data-[collapsible=icon]:block'
								/>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className='border-0 bg-transparent'>
					<SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
						Application
					</SidebarGroupLabel>
					<SidebarGroupContent className='px-0'>
						<SidebarMenu>
							{items.map((item) => {
								const IconComponent = item.icon;
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton className='px-0 py-0'>
											<NavLink
												to={item.to}
												className='flex w-full items-center px-2 gap-3 rounded-lg py-2'
											>
												{IconComponent && (
													<IconComponent className='h-4 w-4' />
												)}
												<span className='group-data-[collapsible=icon]:hidden'>
													{item.title}
												</span>
											</NavLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<Avatar>
										<AvatarImage src={user.avatar} />
										<AvatarFallback>User</AvatarFallback>
									</Avatar>
									<span className='group-data-[collapsible=icon]:hidden'>
										{user.name}
									</span>
									<ChevronUp className='ml-auto group-data-[collapsible=icon]:hidden' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem>
									<User />
									<NavLink to='/profile'>Profile</NavLink>
								</DropdownMenuItem>
								<DropdownMenuItem variant='destructive'>
									<LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
									<span className='cursor-pointer w-full flex items-center'>
										Logout
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
