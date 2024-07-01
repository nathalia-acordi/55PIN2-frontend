import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./Login.tsx";
import CadastroConta from "./components/CadastroConta/index.tsx";
import Search from "./Search.tsx";
import Profile from "./components/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/cadastro",
    element: <CadastroConta />,
  },
  {
    path: "/busca",
    element: <Search />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element:
      localStorage.getItem("logged") === "true" ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/login" />
      ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
