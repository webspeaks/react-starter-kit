export const sidebarMenu = {
  primary: [
    {
      key: "home",
      label: "Home",
      to: "/",
      icon: {
        tone: "neutral",
        d: "M3 12l9-9 9 9v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V10a2 2 0 00-2-2H9a2 2 0 00-2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z",
      },
    },
    {
      key: "projects",
      label: "Projects",
      to: "/projects",
      icon: {
        tone: "neutral",
        d: "M4 4h16v6H4V4zm0 10h16v6H4v-6z",
      },
    },
    {
      key: "messages",
      label: "Messages",
      icon: {
        tone: "neutral",
        d: "M8 10h.01M12 10h.01M16 10h.01M21 10c0 6-9 10-9 10S3 16 3 10a9 9 0 0118 0z",
      },
    },
  ],
  groups: [
    {
      key: "analytics",
      label: "Analytics",
      defaultExpanded: true,
      items: [
        { key: "overview", label: "Overview" },
        { key: "reports", label: "Reports" },
        { key: "exports", label: "Exports" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      defaultExpanded: false,
      items: [
        { key: "profile", label: "Profile" },
        { key: "team", label: "Team" },
        { key: "billing", label: "Billing" },
      ],
    },
  ],
};
