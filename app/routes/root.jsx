import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootLayout } from "../layouts/RootLayout";

import { getAuthToken, requireAuthUser } from "../server/auth";
import { setCredentials } from "../store/authSlice";

export async function loader({ request }) {
  const token = getAuthToken(request);
  if (!token) {
    return { user: null };
  }

  try {
    const { user } = await requireAuthUser(request);
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
