import { Outlet } from "react-router-dom";
import { MobileHeader, MobileTabletNav } from "../components";

function MainLayout() {
  return (
    <>
      <MobileHeader />
      <main className="min-h-screen bg-base-200 pb-24 pt-24">
        <Outlet />
      </main>
      <MobileTabletNav />
    </>
  );
}

export default MainLayout;
