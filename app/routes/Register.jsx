import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { Button } from "../components/UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UI/Card";
import { Input } from "../components/UI/Input";

async function registerRequest(payload) {
  const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data?.message === "string" ? data.message : "Registration failed";
    throw new Error(message);
  }

  return data;
}

export function meta() {
  return [{ title: "Register | App Name" }];
}

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate("/login");
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
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Register a user via Platzi Fake Store API.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="mt-4 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({
                  name,
                  email,
                  password,
                  avatar: "https://api.lorem.space/image/face?w=640&h=480",
                });
              }}
            >
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={mutation.isPending}
                  required
                />
              </div>

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
                  autoComplete="new-password"
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
                {mutation.isPending ? "Creating..." : "Create account"}
              </Button>

              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link className="text-foreground underline" to="/login">
                  Sign in
                </Link>
                .
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
