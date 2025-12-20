import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootLayout } from "../layouts/RootLayout";

import { getAuthToken, requireAuthToken } from "../server/auth";
import { API_BASE_URL } from "../config/server";
import { setCredentials } from "../store/authSlice";
import { requestJson } from "../api/http";

export function shouldRevalidate() {
  return false;
}

export async function loader({ request }) {
  const token = getAuthToken(request);
  if (!token) {
    return { user: null, token: null };
  }

  try {
    const accessToken = requireAuthToken(request);
    const user = await requestJson(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { user, token: accessToken };
  } catch {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search || ""}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;

    throw redirect(loginUrl);
  }
}

export default function Root() {
  const dispatch = useDispatch();
  const { user, token } = useLoaderData();

  useEffect(() => {
    dispatch(setCredentials({ token, user }));
  }, [dispatch, token, user]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
