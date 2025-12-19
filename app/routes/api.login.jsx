import { buildAuthCookie } from "../server/auth";

async function dummyLogin({ username, password }) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data?.message === "string" ? data.message : "Login failed";
    throw new Response(message, { status: res.status || 400 });
  }

  return data;
}

export async function action({ request }) {
  if (request.method.toUpperCase() !== "POST") {
    return new Response(null, { status: 405 });
  }

  const body = await request.json();
  const username = body?.username;
  const password = body?.password;

  if (typeof username !== "string" || typeof password !== "string") {
    return new Response("Invalid payload", { status: 400 });
  }

  const data = await dummyLogin({ username, password });

  const token =
    typeof data?.accessToken === "string"
      ? data.accessToken
      : typeof data?.token === "string"
        ? data.token
        : null;

  if (!token) {
    return new Response("No token returned", { status: 502 });
  }

  return new Response(JSON.stringify({ user: data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildAuthCookie(token),
    },
  });
}
