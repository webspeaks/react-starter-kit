import { Home, Inbox, Settings, Table, User2 } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Projects",
    to: "/projects",
    icon: Table,
  },
  {
    title: "Users",
    to: "/users",
    icon: User2,
  },
  {
    title: "Messages",
    to: "/",
    icon: Inbox,
  },
  {
    title: "Settings",
    to: "/",
    icon: Settings,
  },
];
