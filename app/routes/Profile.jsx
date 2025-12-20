import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router";

import { Card } from "@/components/UI/Card";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import {
  Page,
  PageActions,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/UI/Page";
import { useUpdateUserMutation } from "@/queries/user";
import { setCredentials } from "@/store/authSlice";

export function meta() {
  return [
    { title: "Profile | App Name" },
    { name: "description", content: "Update your profile information" },
  ];
}

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userId = user?.id;

  const mutation = useUpdateUserMutation({
    onSuccess: (data) => {
      // Update local auth user with the response
      dispatch(setCredentials({ token, user: data }));
    },
  });

  const [formState, setFormState] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  useEffect(() => {
    // Sync form values when user data becomes available (e.g., after reload)
    setFormState((prev) => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
    }));
  }, [user?.name, user?.email]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId) {
      mutation.reset();
      return;
    }

    const payload = {
      name: formState.name,
      email: formState.email,
      ...(formState.password ? { password: formState.password } : {}),
    };

    mutation.mutate({ id: userId, payload });
  }

  return (
    <Page>
      <PageHeader>
        <div className="space-y-2">
          <PageTitle>Profile</PageTitle>
          <PageDescription>
            Update your basic account information.
          </PageDescription>
        </div>
        <PageActions />
      </PageHeader>

      <PageContent>
        <Card className="max-w-xl p-6 space-y-6">
          <Form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="name"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to keep your current password.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="px-5"
                disabled={mutation.isPending || !userId}
              >
                {mutation.isPending ? "Saving..." : "Save changes"}
              </Button>
              {mutation.isError ? (
                <span className="text-xs text-red-600">
                  {mutation.error?.message || "Update failed"}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {mutation.isSuccess
                    ? "Saved!"
                    : "Changes will be applied after you submit."}
                </span>
              )}
            </div>
          </Form>
        </Card>
      </PageContent>
    </Page>
  );
}
