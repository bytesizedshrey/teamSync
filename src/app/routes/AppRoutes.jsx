import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import React from "react";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../features/auth/ui/pages/Login";
import Register from "../features/auth/ui/pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../features/dashboard/ui/pages/Home";
import PageTransition from "../layouts/PageTransition";
import ProtectedRoutes from "../protectedRoutes/ProtectedRoutes";
import PublicRoutes from "../publicRoutes/PublicRoutes";

const RootLayout = () => (
  <PageTransition>
    <Outlet />
  </PageTransition>
);

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          element: <PublicRoutes />,
          children: [
            {
              path: "/",
              element: <AuthLayouts/>,
              children: [
                {
                    index: true,
                    element : <Login/>
                },
                {
                    path : "register",
                    element : <Register/>
                }
              ]
            }
          ]
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "home",
              element: <DashboardLayout />,
              children: [
                {
                  index: true,
                  element: <Home />
                }
              ]
            }
          ]
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
