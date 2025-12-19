import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ token: state.auth.token, user: state.auth.user }),
      );
    } catch {
      // Ignore localStorage errors (e.g. blocked).
    }
  });
}
