import { NavLink } from "react-router";

export function SidebarMenu({
  primaryItems,
  groups,
  expandedGroups,
  onToggleGroup,
  onNavigate,
}) {
  function renderIcon(icon, isActive = false) {
    if (!icon || !icon.d) {
      return null;
    }

    const toneClasses = isActive
      ? "bg-indigo-50 text-indigo-700"
      : icon.tone === "primary"
        ? "bg-indigo-50 text-indigo-700"
        : "bg-gray-100 text-gray-700";

    return (
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${toneClasses}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icon.d} />
        </svg>
      </span>
    );
  }

  return (
    <>
      <nav className="space-y-1">
        {primaryItems.map((item) => {
          if (item.to) {
            return (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={onNavigate}
              >
                {({ isActive }) => (
                  <>
                    {renderIcon(item.icon, isActive)}
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          }

          return (
            <button
              key={item.key}
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={onNavigate}
            >
              {renderIcon(item.icon, false)}
              <span>{item.label}</span>
            </button>
          );
        })}
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
              aria-expanded={!!expandedGroups[group.key]}
              aria-controls={group.id}
              onClick={() => onToggleGroup(group.key)}
            >
              <span>{group.label}</span>
              <svg
                viewBox="0 0 20 20"
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  expandedGroups[group.key] ? "rotate-180" : "rotate-0"
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
                expandedGroups[group.key] ? "block" : "hidden"
              } border-t border-gray-200 px-2 py-2`}
            >
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="flex w-full items-center rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={onNavigate}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
