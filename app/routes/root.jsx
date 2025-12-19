import { Outlet } from "react-router";
import { RootLayout } from "../layouts/RootLayout";

export default function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
