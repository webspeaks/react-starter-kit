import { useId, useMemo, useState } from "react";
import { Link } from "react-router";

export function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    analytics: true,
    settings: false,
  });

  const analyticsGroupId = useId();
  const settingsGroupId = useId();

  const groups = useMemo(
    () => [
      {
        key: "analytics",
        label: "Analytics",
        id: analyticsGroupId,
        items: ["Overview", "Reports", "Exports"],
      },
      {
        key: "settings",
        label: "Settings",
        id: settingsGroupId,
        items: ["Profile", "Team", "Billing"],
      },
    ],
    [analyticsGroupId, settingsGroupId],
  );

  function toggleGroup(key) {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-3 sm:px-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
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
            <div className="hidden text-sm text-gray-600 sm:block">
              John Doe
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="flex w-full">
        <aside className="hidden w-72 shrink-0 border-r border-gray-200 bg-white lg:block">
          <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto p-3">
            <nav className="space-y-1">
              <Link
                to="/"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l9-9 9 9v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V10a2 2 0 00-2-2H9a2 2 0 00-2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z"
                    />
                  </svg>
                </span>
                <span>Home</span>
              </Link>

              <Link
                to="/projects"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4h16v6H4V4zm0 10h16v6H4v-6z"
                    />
                  </svg>
                </span>
                <span>Projects</span>
              </Link>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M21 10c0 6-9 10-9 10S3 16 3 10a9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span>Messages</span>
              </button>
            </nav>

            <div className="mt-6 space-y-3">
              {groups.map((group) => (
                <div
                  key={group.key}
                  className="rounded-lg border border-gray-200 bg-white"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50"
                    aria-expanded={!!openGroups[group.key]}
                    aria-controls={group.id}
                    onClick={() => toggleGroup(group.key)}
                  >
                    <span>{group.label}</span>
                    <svg
                      viewBox="0 0 20 20"
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        openGroups[group.key] ? "rotate-180" : "rotate-0"
                      }`}
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div
                    id={group.id}
                    className={`${openGroups[group.key] ? "block" : "hidden"} border-t border-gray-200 px-2 py-2`}
                  >
                    <div className="space-y-1">
                      {group.items.map((label) => (
                        <button
                          key={label}
                          type="button"
                          className="flex w-full items-center rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              onClick={() => setSidebarOpen(false)}
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
                  onClick={() => setSidebarOpen(false)}
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
                <nav className="space-y-1">
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 12l9-9 9 9v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V10a2 2 0 00-2-2H9a2 2 0 00-2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z"
                        />
                      </svg>
                    </span>
                    <span>Home</span>
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4h16v6H4V4zm0 10h16v6H4v-6z"
                        />
                      </svg>
                    </span>
                    <span>Projects</span>
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M21 10c0 6-9 10-9 10S3 16 3 10a9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span>Messages</span>
                  </button>
                </nav>

                <div className="mt-6 space-y-3">
                  {groups.map((group) => (
                    <div
                      key={group.key}
                      className="rounded-lg border border-gray-200 bg-white"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50"
                        aria-expanded={!!openGroups[group.key]}
                        aria-controls={group.id}
                        onClick={() => toggleGroup(group.key)}
                      >
                        <span>{group.label}</span>
                        <svg
                          viewBox="0 0 20 20"
                          className={`h-4 w-4 text-gray-500 transition-transform ${
                            openGroups[group.key] ? "rotate-180" : "rotate-0"
                          }`}
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      <div
                        id={group.id}
                        className={`${
                          openGroups[group.key] ? "block" : "hidden"
                        } border-t border-gray-200 px-2 py-2`}
                      >
                        <div className="space-y-1">
                          {group.items.map((label) => (
                            <button
                              key={label}
                              type="button"
                              className="flex w-full items-center rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setSidebarOpen(false)}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
