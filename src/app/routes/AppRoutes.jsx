import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../features/auth/ui/pages/Login";
import Register from "../features/auth/ui/pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../features/dashboard/ui/pages/Home";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element:<AuthLayouts/>,
      children: [
        {
            path: "",
            element : <Login/>
        },
        {
            path : "register",
            element : <Register/>
        }
      ]
    },

    {
      path: "/home",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
