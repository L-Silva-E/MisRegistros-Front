import { RouteObject } from "react-router-dom";

import { List, View, Create, Update, Meta } from "../pages";

export const routes: RouteObject[] = [
  {
    path: "recipes",
    element: <List />,
  },
  {
    path: "recipes/:id",
    element: <View />,
  },
  {
    path: "recipes/create",
    element: <Create />,
  },
  {
    path: "recipes/update/:id",
    element: <Update />,
  },
  {
    path: "recipe/meta",
    element: <Meta />,
  },
];
