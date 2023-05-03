import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Deck from "./components/Deck.jsx";
import Collections from "./components/Collections.jsx";
import Home from "./components/Home.jsx";
import './styles.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Root</div>
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/deck",
    element: <Deck />
  },
  {
    path: "/collections",
    element: <Collections />
  },
  {
    path: "/signup",
    element: <div>signup</div>
  },
  {
    path: "/login",
    element: <div>Login</div>
  },
  {
    element: <div>Not found</div>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);