import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { requireAuthToken } from "../server/auth";

export async function loader({ request }) {
  requireAuthToken(request);
  return null;
}

export default function Protected() {
  const navigate = useNavigate();
  const isAuthed = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login");
    }
  }, [isAuthed, navigate]);

  if (!isAuthed) {
    return null;
  }

  return <Outlet />;
}
