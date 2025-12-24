import { useDispatch, useSelector } from "react-redux";

import AppSidebar from "../components/App/Sidebar";
import AppHeader from "../components/App/Header";

import { SidebarProvider } from "../components/ui/sidebar.jsx";

import { useSidebarWithCookies } from "../hooks/useSidebar";

import { setThemeMode } from "../store/themeSlice";

export function RootLayout({ children }) {
	const dispatch = useDispatch();
	const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
	const themeMode = useSelector((state) => state.theme.mode);
	const { openSidebar, closeSidebar } = useSidebarWithCookies();

	// Don't render anything until sidebar state is initialized
	if (sidebarOpen === null) {
		return null;
	}

	return (
		<SidebarProvider
			open={sidebarOpen}
			onOpenChange={(open) => {
				if (open) {
					openSidebar();
				} else {
					closeSidebar();
				}
			}}
			collapsed={!sidebarOpen}
		>
			<AppSidebar />
			<main className='flex-1'>
				<AppHeader
					sidebarOpen={sidebarOpen}
					onOpenSidebar={() => openSidebar()}
					themeMode={themeMode}
					onSetTheme={(mode) => dispatch(setThemeMode(mode))}
				/>
				<div className='px-4'>{children}</div>
			</main>
		</SidebarProvider>
	);
}
