import { Moon, Sun, Settings, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useLogoutMutation } from "@/queries/auth";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.jsx";

import { logout } from "@/store/authSlice";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { SidebarTrigger } from "../ui/sidebar.jsx";

export default function AppHeader({ onSetTheme }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const isAuthed = useSelector((state) => !!state.auth.token);
	const [isLoading, setIsLoading] = useState(true);

	const logoutMutation = useLogoutMutation({
		onSettled: () => {
			dispatch(logout());
			navigate("/login");
		},
	});

	useEffect(() => {
		// Set loading to false once the component mounts and auth state is determined
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 0);

		return () => clearTimeout(timer);
	}, []);

	function onLogout() {
		logoutMutation.mutate();
	}

	return (
		<nav className='p-4 flex items-center justify-between'>
			{/*LEFT*/}
			<SidebarTrigger />

			{/*RIGHT*/}
			<div className='flex items-center gap-4'>
				<Link to='/'>Home</Link>

				{/* Theme menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='icon'>
							<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
							<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
							<span className='sr-only'>Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => onSetTheme("light")}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onSetTheme("dark")}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onSetTheme("system")}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* User menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar>
							<AvatarImage src={user?.avatar} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						sideOffset={10}
						className='w-52'
						align='end'
					>
						<DropdownMenuLabel className='font-normal'>
							{user?.name ? user.name : "My Account"}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className='h-[1.2rem] w-[1.2rem] mr-2' />
							<Link
								to='/profile'
								className='cursor-pointer w-full flex items-center'
							>
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
							<Link
								to='/profile'
								className='cursor-pointer w-full flex items-center'
							>
								Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant='destructive' onClick={onLogout}>
							<LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
							<span className='cursor-pointer w-full flex items-center'>
								Logout
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
