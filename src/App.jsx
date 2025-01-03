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
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Dashboard } from "./pages";

function App() {
  const user = false;
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

  return <RouterProvider router={routes} />;
}

export default App;
