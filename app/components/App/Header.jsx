import { Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useLogoutMutation } from "@/queries/auth";

import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/UI/DropdownMenu";
import { User, Settings, LogOut } from "lucide-react";

import { logout } from "@/store/authSlice";

export function AppHeader({
  sidebarOpen,
  onOpenSidebar,
  desktopSidebarCollapsed,
  onToggleDesktopSidebar,
  themeMode,
  onToggleTheme,
}) {
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex h-14 w-full items-center gap-3 px-3 sm:px-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring lg:hidden"
          aria-label="Open sidebar"
          aria-expanded={sidebarOpen}
          onClick={onOpenSidebar}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring lg:inline-flex"
          aria-label={desktopSidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
          aria-pressed={!desktopSidebarCollapsed}
          onClick={onToggleDesktopSidebar}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {desktopSidebarCollapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 18l6-6-6-6"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 18l-6-6 6-6"
              />
            )}
          </svg>
        </button>

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
            A
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">App Name</div>
            <div className="truncate text-xs text-gray-500">Dashboard</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label={
              themeMode === "dark" ? "Switch to light" : "Switch to dark"
            }
          >
            {themeMode === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : isAuthed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 rounded-full px-2 pl-2.5 pr-3 gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
                    <span className="text-sm font-semibold">
                      {typeof user?.name === "string"
                        ? user.name[0].toUpperCase()
                        : "U"}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-foreground">
                    {typeof user?.name === "string" ? user.name : "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {typeof user?.name === "string" ? user.name : "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="cursor-pointer w-full flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="cursor-pointer w-full flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
