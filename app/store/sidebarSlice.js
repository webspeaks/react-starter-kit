import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  expandedGroups: {
    analytics: true,
    settings: false,
  },
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
  toggleGroup,
  setGroupExpanded,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
