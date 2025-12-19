import { useId, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import { sidebarMenu as sidebarMenuConfig } from "../config/sidebarMenu";

import { SidebarMenu } from "../components/App/SidebarMenu";
import { AppHeader } from "../components/App/Header";

import {
  closeSidebar,
  openSidebar,
  toggleDesktopSidebar,
  toggleGroup as toggleGroupAction,
} from "../store/sidebarSlice";

import { toggleThemeMode } from "../store/themeSlice";

export function RootLayout({ children }) {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const desktopSidebarCollapsed = useSelector(
    (state) => state.sidebar.desktopSidebarCollapsed,
  );
  const themeMode = useSelector((state) => state.theme.mode);
  const expandedGroups = useSelector((state) => state.sidebar.expandedGroups);

  const groupIdBase = useId();

  const groups = useMemo(() => {
    return sidebarMenuConfig.groups.map((group) => ({
      ...group,
      id: `${groupIdBase}-${group.key}`,
    }));
  }, [groupIdBase]);

  const primaryItems = sidebarMenuConfig.primary;

  function toggleGroup(key) {
    dispatch(toggleGroupAction(key));
  }

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <AppHeader
        sidebarOpen={sidebarOpen}
        onOpenSidebar={() => dispatch(openSidebar())}
        desktopSidebarCollapsed={desktopSidebarCollapsed}
        onToggleDesktopSidebar={() => dispatch(toggleDesktopSidebar())}
        themeMode={themeMode}
        onToggleTheme={() => dispatch(toggleThemeMode())}
      />

      <div className="flex w-full">
        <aside
          className={`hidden w-72 shrink-0 border-r border-gray-200 bg-white lg:block ${
            desktopSidebarCollapsed ? "lg:hidden" : ""
          }`}
        >
          <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto p-3">
            <SidebarMenu
              primaryItems={primaryItems}
              groups={groups}
              expandedGroups={expandedGroups}
              onToggleGroup={toggleGroup}
            />
          </div>
        </aside>

        {sidebarOpen ? (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-gray-900/50"
              onClick={() => dispatch(closeSidebar())}
            />
            <div className="absolute inset-y-0 left-0 w-[18rem] bg-white shadow-xl">
              <div className="flex h-14 items-center justify-between border-b border-gray-200 px-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-semibold text-white">
                    A
                  </div>
                  <div className="text-sm font-semibold">App Name</div>
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close sidebar"
                  onClick={() => dispatch(closeSidebar())}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto p-3">
                <SidebarMenu
                  primaryItems={primaryItems}
                  groups={groups}
                  expandedGroups={expandedGroups}
                  onToggleGroup={toggleGroup}
                  onNavigate={() => dispatch(closeSidebar())}
                />
              </div>
            </div>
          </div>
        ) : null}

        <main className="min-w-0 flex-1 p-3 sm:p-4 lg:p-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
