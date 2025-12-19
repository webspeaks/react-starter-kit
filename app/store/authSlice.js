import { createSlice } from "@reduxjs/toolkit";

function getInitialState() {
  if (typeof window === "undefined") {
    return {
      token: null,
      user: null,
    };
  }

  try {
    const raw = window.localStorage.getItem("auth");
    if (!raw) {
      return {
        token: null,
        user: null,
      };
    }

    const parsed = JSON.parse(raw);
    return {
      token: typeof parsed?.token === "string" ? parsed.token : null,
      user:
        parsed?.user && typeof parsed.user === "object" ? parsed.user : null,
    };
  } catch {
    return {
      token: null,
      user: null,
    };
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials(state, action) {
      const { token, user } = action.payload || {};
      state.token = typeof token === "string" ? token : null;
      state.user = user && typeof user === "object" ? user : null;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
