import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { Button } from "../components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UI/Card";
import { Input } from "../components/UI/input";

import { setCredentials } from "../store/authSlice";

async function loginRequest({ username, password }) {
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
    throw new Error(message);
  }

  return data;
}

export function meta() {
  return [{ title: "Login | App Name" }];
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => !!state.auth.token);

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.accessToken, user: data }));
      navigate("/");
    },
  });

  const errorMessage = useMemo(() => {
    const msg = mutation.error?.message;
    return typeof msg === "string" ? msg : null;
  }, [mutation.error]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-md items-center px-4 py-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isAuthed ? (
              <div className="rounded-md border border-border bg-muted p-3 text-sm">
                You are already logged in. Go to{" "}
                <Link className="font-medium underline" to="/">
                  Home
                </Link>
                .
              </div>
            ) : null}

            <form
              className="mt-4 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({ username, password });
              }}
            >
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={mutation.isPending}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={mutation.isPending}
                  required
                />
              </div>

              {errorMessage ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {errorMessage}
                </div>
              ) : null}

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link className="text-foreground underline" to="/register">
                  Create one
                </Link>
                .
              </div>

              <div className="text-xs text-muted-foreground">
                DummyJSON test user defaults are prefilled.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
