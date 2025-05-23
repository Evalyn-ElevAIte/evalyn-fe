import React from "react";
import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";

const AppRouter = createBrowserRouter([
  // Landing page at root
  {
    path: "/",
    element: <LandingPage />,
  },

  // Auth pages (no layout)
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // Main layout for all app pages (clean URLs)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "activity",
        element: <div>Activity Page</div>,
      },
      {
        path: "quizzes",
        element: <div>My Quizzes Page</div>,
      },
    ],
  },

  // Optional fallback
  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
]);

export default AppRouter;
