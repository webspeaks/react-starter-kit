import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
  },
});
