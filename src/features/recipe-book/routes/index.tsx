import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Box, Spinner, Center } from "@chakra-ui/react";

// Lazy loading de los componentes de páginas
const List = lazy(() => import("../pages/List"));
const View = lazy(() => import("../pages/View"));
const Create = lazy(() => import("../pages/Create"));
const Update = lazy(() => import("../pages/Update"));
const Meta = lazy(() => import("../pages/Meta"));

// Componente de loading
const PageLoader = () => (
  <Center h="400px">
    <Box textAlign="center">
      <Spinner size="xl" color="green.500" />
    </Box>
  </Center>
);

// Wrapper para lazy components con Suspense
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "recipes",
    element: withSuspense(List),
  },
  {
    path: "recipes/:id",
    element: withSuspense(View),
  },
  {
    path: "recipes/create",
    element: withSuspense(Create),
  },
  {
    path: "recipes/update/:id",
    element: withSuspense(Update),
  },
  {
    path: "recipe/meta",
    element: withSuspense(Meta),
  },
];
