import { Outlet } from "react-router";

import { requireAuthToken } from "../server/auth";

export async function loader({ request }) {
  requireAuthToken(request);
  return null;
}

export default function Protected() {
  return <Outlet />;
}
