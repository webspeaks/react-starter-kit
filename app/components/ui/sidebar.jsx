import {
	createContext,
	forwardRef,
	useContext,
	useMemo,
	useState,
} from "react";

import { cn } from "@/lib/utils";

const SidebarContext = createContext(null);

export function SidebarProvider({
	children,
	open: controlledOpen,
	onOpenChange,
	collapsed: controlledCollapsed,
	onCollapsedChange,
	defaultOpen = true,
	defaultCollapsed = false,
}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [uncontrolledCollapsed, setUncontrolledCollapsed] =
		useState(defaultCollapsed);

	const open = controlledOpen ?? uncontrolledOpen;
	const collapsed = controlledCollapsed ?? uncontrolledCollapsed;

	const value = useMemo(() => {
		function setOpen(next) {
			if (onOpenChange) {
				onOpenChange(next);
			} else {
				setUncontrolledOpen(next);
			}
		}

		function setCollapsed(next) {
			if (onCollapsedChange) {
				onCollapsedChange(next);
			} else {
				setUncontrolledCollapsed(next);
			}
		}

		return {
			open,
			collapsed,
			setOpen,
			toggleOpen: () => setOpen(!open),
			setCollapsed,
			toggleCollapsed: () => setCollapsed(!collapsed),
		};
	}, [open, collapsed, onOpenChange, onCollapsedChange]);

	return (
		<SidebarContext.Provider value={value}>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const ctx = useContext(SidebarContext);
	if (!ctx) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return ctx;
}

export const Sidebar = forwardRef(function Sidebar(
	{ className, children, collapsible, ...props },
	ref
) {
	const { collapsed, open } = useSidebar();
	return (
		<aside
			ref={ref}
			data-collapsible={collapsed ? collapsible : undefined}
			className={cn(
				"group",
				"fixed inset-y-0 left-0 z-40 flex h-full min-h-dvh w-72 flex-col border-r border-border bg-card text-card-foreground shadow-lg transition-all duration-200",
				"lg:relative lg:z-0 lg:min-h-[calc(100dvh-3.5rem)] lg:shadow-none",
				open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
				collapsed && "w-16",
				className
			)}
			{...props}
		>
			{children}
			<SidebarRail />
		</aside>
	);
});

export function SidebarHeader({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex h-14 shrink-0 items-center gap-3 border-b border-border px-3",
				className
			)}
			{...props}
		/>
	);
}

export function SidebarFooter({ className, ...props }) {
	return (
		<div
			className={cn("mt-auto border-t border-border px-3 py-1", className)}
			{...props}
		/>
	);
}

export function SidebarContent({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex-1 overflow-y-auto px-3 py-3",
				"supports-[height:100dvh]:h-[calc(100dvh-3.5rem)]",
				className
			)}
			{...props}
		/>
	);
}

export function SidebarGroup({ className, ...props }) {
	return (
		<div
			className={cn("space-y-2 rounded-lg border bg-background", className)}
			{...props}
		/>
	);
}

export function SidebarGroupLabel({ className, ...props }) {
	return (
		<div
			className={cn(
				"flex items-center justify-between px-3 py-2 text-sm font-semibold",
				className
			)}
			{...props}
		/>
	);
}

export function SidebarGroupAction({ className, ...props }) {
	return (
		<button
			className={cn(
				"flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground",
				className
			)}
			{...props}
		/>
	);
}

export function SidebarGroupContent({ className, ...props }) {
	return <div className={cn("px-2 pb-2", className)} {...props} />;
}

export function SidebarMenu({ className, ...props }) {
	return <div className={cn("space-y-1", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }) {
	return <div className={cn("group/sidebar-item", className)} {...props} />;
}

export const SidebarMenuButton = forwardRef(function SidebarMenuButton(
	{ className, isActive, asChild: Comp = "button", children, ...props },
	ref
) {
	return (
		<Comp
			ref={ref}
			className={cn(
				"flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
				isActive
					? "bg-primary/10 text-primary"
					: "text-foreground hover:bg-accent",
				className
			)}
			{...props}
		>
			{children}
		</Comp>
	);
});

export function SidebarMenuBadge({ className, ...props }) {
	return (
		<span
			className={cn(
				"ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground",
				className
			)}
			{...props}
		/>
	);
}

export function SidebarMenuSub({ className, ...props }) {
	return (
		<div
			className={cn("ml-2 space-y-1 border-l border-border pl-3", className)}
			{...props}
		/>
	);
}

export function SidebarSeparator({ className, ...props }) {
	return (
		<div className={cn("my-3 h-px w-full bg-border", className)} {...props} />
	);
}

export function SidebarRail() {
	const { collapsed } = useSidebar();
	return (
		<div
			className={cn(
				"absolute inset-y-0 right-0 w-px bg-border transition-opacity lg:block",
				collapsed ? "opacity-0" : "opacity-100"
			)}
		/>
	);
}

export function SidebarTrigger({ className, ...props }) {
	const { toggleOpen } = useSidebar();
	return (
		<button
			type='button'
			className={cn(
				"inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				className
			)}
			onClick={toggleOpen}
			{...props}
		>
			<svg
				viewBox='0 0 24 24'
				className='h-5 w-5'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M4 6h16M4 12h16M4 18h16'
				/>
			</svg>
		</button>
	);
}
