import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootLayout } from "../layouts/RootLayout";

import { getAuthToken, requireAuthToken } from "../server/auth";
import { setCredentials } from "../store/authSlice";

export function shouldRevalidate() {
  return false;
}

export async function loader({ request }) {
  const token = getAuthToken(request);
  if (!token) {
    return { user: null };
  }

  try {
    const accessToken = requireAuthToken(request);
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
