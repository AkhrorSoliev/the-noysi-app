import { Outlet } from "react-router-dom";
import { Header, MobileTabletNav, OnlineUsers, Sidebar } from "../components";

function MainLayout() {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen w-full overflow-x-auto bg-base-100 pb-24 pt-24 dark:bg-base-200 md:relative md:pt-0 lg:max-h-screen">
        <Header />
        <Outlet />
      </main>
      <MobileTabletNav />
      <OnlineUsers />
    </>
  );
}

export default MainLayout;
