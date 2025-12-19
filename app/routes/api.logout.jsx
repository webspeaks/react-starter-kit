import { buildLogoutCookie } from "../server/auth";

export async function action({ request }) {
  if (request.method.toUpperCase() !== "POST") {
    return new Response(null, { status: 405 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildLogoutCookie(),
    },
  });
}
