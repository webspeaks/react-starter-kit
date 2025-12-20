import { redirect } from "react-router";

const COOKIE_NAME = "auth_token";

function parseCookies(header) {
  if (!header || typeof header !== "string") {
    return {};
  }

  const out = {};
  const parts = header.split(";");
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) {
      continue;
    }
    out[rawKey] = decodeURIComponent(rest.join("="));
  }
  return out;
}

function serializeCookie(name, value, options = {}) {
  let str = `${name}=${encodeURIComponent(value)}`;

  if (options.maxAge != null) {
    str += `; Max-Age=${options.maxAge}`;
  }
  if (options.path) {
    str += `; Path=${options.path}`;
  }
  if (options.httpOnly) {
    str += "; HttpOnly";
  }
  if (options.sameSite) {
    str += `; SameSite=${options.sameSite}`;
  }
  if (options.secure) {
    str += "; Secure";
  }

  return str;
}

export function getAuthToken(request) {
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];
  return typeof token === "string" && token.length ? token : null;
}

export function buildAuthCookie(token) {
  return serializeCookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function buildLogoutCookie() {
  return serializeCookie(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}

export async function requireAuthUser(request) {
  const token = getAuthToken(request);
  if (!token) {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search || ""}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;
    throw redirect(loginUrl);
  }

  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const url = new URL(request.url);
      const redirectTo = `${url.pathname}${url.search || ""}`;
      const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;
      throw redirect(loginUrl, {
        headers: {
          "Set-Cookie": buildLogoutCookie(),
        },
      });
    }

    const user = await res.json();
    return { token, user };
  } catch {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search || ""}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;
    throw redirect(loginUrl, {
      headers: {
        "Set-Cookie": buildLogoutCookie(),
      },
    });
  }
}

export function requireAuthToken(request) {
  const token = getAuthToken(request);
  if (!token) {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search || ""}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;

    throw redirect(loginUrl);
  }

  return token;
}
