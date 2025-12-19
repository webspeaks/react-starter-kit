import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootLayout } from "../layouts/RootLayout";

import { getAuthToken } from "../server/auth";
import { setCredentials } from "../store/authSlice";

export async function loader({ request }) {
  const token = getAuthToken(request);
  if (!token) {
    return { user: null };
  }

  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { user: null };
    }

    const user = await res.json();
    return { user };
  } catch {
    return { user: null };
  }
}

export default function Root() {
  const dispatch = useDispatch();
  const { user } = useLoaderData();

  useEffect(() => {
    dispatch(setCredentials({ token: user ? "cookie" : null, user }));
  }, [dispatch, user]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
