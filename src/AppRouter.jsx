import React from "react";
import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default AppRouter;
