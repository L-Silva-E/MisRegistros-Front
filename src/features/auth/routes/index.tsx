import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));

const PageLoader = () => (
  <Center h="100vh">
    <Spinner size="xl" color="green.500" />
  </Center>
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: withSuspense(LoginPage),
  },
  {
    path: "/register",
    element: withSuspense(RegisterPage),
  },
  {
    path: "/forgot-password",
    element: withSuspense(ForgotPasswordPage),
  },
  {
    path: "/reset-password",
    element: withSuspense(ResetPasswordPage),
  },
];
