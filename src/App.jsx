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
} from "./pages";

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
      ],
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  if (!authIsReady) {
    return (
      <section className="grid h-screen place-items-center">
        <span className="loading"></span>
      </section>
    );
  }

  return <>{authIsReady && <RouterProvider router={routes} />}</>;
}

export default App;
