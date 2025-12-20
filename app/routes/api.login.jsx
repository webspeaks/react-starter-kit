import { buildAuthCookie } from "../server/auth";
import { API_BASE_URL } from "../config/server";

async function platziLogin({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data?.message === "string" ? data.message : "Login failed";
    throw new Response(message, { status: res.status || 400 });
  }

  return data;
}

async function platziProfile(accessToken) {
  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : "Failed to load profile";
    throw new Response(message, { status: res.status || 400 });
  }

  return data;
}

export async function action({ request }) {
  if (request.method.toUpperCase() !== "POST") {
    return new Response(null, { status: 405 });
  }

  const body = await request.json();
  const email = body?.email;
  const password = body?.password;

  if (typeof email !== "string" || typeof password !== "string") {
    return new Response("Invalid payload", { status: 400 });
  }

  const tokens = await platziLogin({ email, password });
  const accessToken =
    typeof tokens?.access_token === "string" ? tokens.access_token : null;

  if (!accessToken) {
    return new Response("No token returned", { status: 502 });
  }

  const user = await platziProfile(accessToken);

  return new Response(JSON.stringify({ user, token: accessToken }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildAuthCookie(accessToken),
    },
  });
}
