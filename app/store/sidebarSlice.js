import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: null // null indicates not initialized yet
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarState(state, action) {
      state.sidebarOpen = action.payload;
    }
  },
});

export const {
  toggleSidebar,
  setSidebarState,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
