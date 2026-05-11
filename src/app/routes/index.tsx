import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../../shared/components/layout/RootLayout";
import HomePage from "../../pages/HomePage";
import WorkInProgressPage from "../../pages/WorkInProgressPage";
import PrivateRoute from "../../features/auth/components/PrivateRoute";

import { routes as recipeRoutes } from "../../features/recipe-book/routes/";
import { routes as authRoutes } from "../../features/auth/routes/";

const router = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      ...recipeRoutes,
      {
        path: "/events",
        element: <WorkInProgressPage />,
      },
    ],
  },
]);

export default router;
