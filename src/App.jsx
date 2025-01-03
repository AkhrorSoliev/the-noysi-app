import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import MainLayout from "./layout/MainLayout";

// components
import ProtectedRoutes from "./components/ProtectedRoutes";

// pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Dashboard } from "./pages";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={true}>
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
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
