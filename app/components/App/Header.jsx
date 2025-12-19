import { Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../UI/Button";

import { logout } from "../../store/authSlice";

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

  async function onLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      dispatch(logout());
      navigate("/login");
    }
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

          {isAuthed ? (
            <>
              <div className="hidden text-sm text-muted-foreground sm:block">
                {typeof user?.firstName === "string" ? user.firstName : "User"}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
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
