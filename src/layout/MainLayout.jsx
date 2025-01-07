import { Outlet } from "react-router-dom";
import {
  MobileHeader,
  MobileTabletNav,
  OnlineUsers,
  Sidebar,
} from "../components";

function MainLayout() {
  return (
    <>
      <MobileHeader />
      <Sidebar />
      <main className="min-h-screen w-full overflow-x-auto bg-base-100 pb-24 pt-24 dark:bg-base-200 lg:max-h-screen lg:pt-5">
        <Outlet />
      </main>
      <MobileTabletNav />
      <OnlineUsers />
    </>
  );
}

export default MainLayout;
