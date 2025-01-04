import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// context
import { GlobalContextProvider } from "./context/context.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <Toaster />
    <App />
  </GlobalContextProvider>,
);
