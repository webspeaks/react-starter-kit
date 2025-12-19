import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setThemeMode } from "../store/themeSlice";

export function ThemeSync() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      dispatch(setThemeMode(stored));
      return;
    }

    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;

    dispatch(setThemeMode(prefersDark ? "dark" : "light"));
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    window.localStorage.setItem("theme", mode);
  }, [mode]);

  return null;
}
