import React from "react";
import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "home",
        element: <Home />,
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
]);

export default AppRouter;
