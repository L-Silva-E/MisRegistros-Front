import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../../shared/components/layout/RootLayout";
import HomePage from "../../pages/HomePage";
import WorkInProgressPage from "../../pages/WorkInProgressPage";

import { routes as recipeRoutes } from "../../features/recipe-book/routes/";
// import { routes as eventRoutes } from "../../features/events/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
