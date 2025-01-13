import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// layouts
import MainLayout from "./layout/MainLayout";

// components
import ProtectedRoutes from "./components/ProtectedRoutes";

// pages
import {
  Create,
  Dashboard,
  Profile,
  Signup,
  Login,
  OnlineUsers,
  User,
  Project,
} from "./pages";

// actions
import { action as signupAction } from "./pages/Signup";

// context
import { useGlobalContext } from "./hooks/useGlobalContext";

function App() {
  const { user, authIsReady } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/onlineUsers",
          element: <OnlineUsers />,
        },
        {
          path: "/user/:id",
          element: <User />,
        },
        {
          path: "/project/:id",
          element: <Project />,
        },
      ],
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: signupAction,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  if (!authIsReady) {
    return (
      <section className="grid h-screen w-full place-items-center">
        <span className="loading"></span>
      </section>
    );
  }

  return <>{authIsReady && <RouterProvider router={routes} />}</>;
}

export default App;
