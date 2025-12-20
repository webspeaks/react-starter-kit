import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../queries/auth";

import { Button } from "../components/UI/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UI/Card.jsx";
import { Input } from "../components/UI/Input.jsx";

import { setCredentials } from "../store/authSlice";

export function meta() {
  return [{ title: "Login | App Name" }];
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => !!state.auth.token);

  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");

  const mutation = useLoginMutation({
    onSuccess: (data) => {
      dispatch(setCredentials({ token: "cookie", user: data.user }));

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect") || "/";
      navigate(redirect);
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
                mutation.mutate({ email, password });
              }}
            >
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Platzi Fake Store API test credentials are prefilled.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
