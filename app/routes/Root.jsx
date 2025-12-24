import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootLayout } from "../layouts/RootLayout";
import { parse } from "cookie";

import { getAuthToken, requireAuthToken } from "../server/auth";
import { API_BASE_URL } from "../config/server";
import { setCredentials } from "../store/authSlice";
import { setSidebarState } from "../store/sidebarSlice";
import { requestJson } from "../api/http";

export function shouldRevalidate() {
	return false;
}

export async function loader({ request }) {
	// Read sidebar state from cookies using react-cookie
	const cookieHeader = request.headers.get("cookie") || "";
	const cookies = parse(cookieHeader);
	const sidebarState =
		cookies.sidebar_state === "true" || cookies.sidebar_state !== "false"; // Default to true

	const token = getAuthToken(request);
	if (!token) {
		return { user: null, token: null, sidebarState };
	}

	try {
		const accessToken = requireAuthToken(request);
		const user = await requestJson(`${API_BASE_URL}/auth/profile`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return { user, token: accessToken, sidebarState };
	} catch {
		const url = new URL(request.url);
		const redirectTo = `${url.pathname}${url.search || ""}`;
		const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;

		throw redirect(loginUrl);
	}
}

export default function Root() {
	const dispatch = useDispatch();
	const { user, token, sidebarState } = useLoaderData();

	useEffect(() => {
		dispatch(setCredentials({ token, user }));
	}, [dispatch, token, user]);

	useEffect(() => {
		dispatch(setSidebarState(sidebarState));
	}, [dispatch, sidebarState]);

	return (
		<RootLayout>
			<Outlet />
		</RootLayout>
	);
}
