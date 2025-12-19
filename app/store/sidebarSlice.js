import { createSlice } from "@reduxjs/toolkit";

import { sidebarMenu } from "../config/sidebarMenu";

function buildDefaultExpandedGroups() {
  return Object.fromEntries(
    sidebarMenu.groups.map((group) => [group.key, !!group.defaultExpanded]),
  );
}

const initialState = {
  sidebarOpen: false,
  desktopSidebarCollapsed: false,
  expandedGroups: buildDefaultExpandedGroups(),
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
    toggleDesktopSidebar(state) {
      state.desktopSidebarCollapsed = !state.desktopSidebarCollapsed;
    },
    setDesktopSidebarCollapsed(state, action) {
      state.desktopSidebarCollapsed = action.payload;
    },
    toggleGroup(state, action) {
      const key = action.payload;
      state.expandedGroups[key] = !state.expandedGroups[key];
    },
    setGroupExpanded(state, action) {
      const { key, expanded } = action.payload;
      state.expandedGroups[key] = expanded;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  setSidebarOpen,
  toggleDesktopSidebar,
  setDesktopSidebarCollapsed,
  toggleGroup,
  setGroupExpanded,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
