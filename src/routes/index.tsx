import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";

import HomePage from "../pages/HomePage";

import RecipesPage from "../pages/RecipesPage";
import ViewRecipePage from "../pages/ViewRecipePage";
import CreateRecipePage from "../pages/CreateRecipePage";
import UpdateRecipePage from "../pages/UpdateRecipePage";
import RecipeMetaPage from "../pages/RecipeMetaPage";

// import EventPage from "../pages/EventPage";

import WorkInProgressPage from "../pages/WorkInProgressPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "recipes",
        element: <RecipesPage />,
      },
      {
        path: "/recipes/:id",
        element: <ViewRecipePage />,
      },
      {
        path: "/recipes/create",
        element: <CreateRecipePage />,
      },
      {
        path: "/recipes/update/:id",
        element: <UpdateRecipePage />,
      },
      {
        path: "/recipe/meta",
        element: <RecipeMetaPage />,
      },
      {
        path: "/events",
        element: <WorkInProgressPage />,
      },
    ],
  },
]);

export default router;
