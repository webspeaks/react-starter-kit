import { Outlet } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";

export default function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
