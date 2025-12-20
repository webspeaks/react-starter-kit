import { redirect } from "react-router";

const COOKIE_NAME = "auth_token";

function base64UrlDecode(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const normalized = padded + "=".repeat(padLength);

  try {
    return Buffer.from(normalized, "base64").toString("utf8");
  } catch {
    return null;
  }
}

function decodeJwtPayload(token) {
  if (typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  const decoded = base64UrlDecode(parts[1]);
  if (!decoded) {
    return null;
  }

  try {
    const json = JSON.parse(decoded);
    return json && typeof json === "object" ? json : null;
  } catch {
    return null;
  }
}

function isJwtExpired(token) {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== "number") {
    return true;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  return exp <= nowSeconds;
}

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
  const token = requireAuthToken(request);
  return { token, user: null };
}

export function requireAuthToken(request) {
  const token = getAuthToken(request);
  if (!token) {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search || ""}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;

    throw redirect(loginUrl);
  }

  if (isJwtExpired(token)) {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search || ""}`;
    const loginUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;

    throw redirect(loginUrl, {
      headers: {
        "Set-Cookie": buildLogoutCookie(),
      },
    });
  }

  return token;
}
