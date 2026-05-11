import "./App.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import router from "./app/routes/";
import customTheme from "./shared/themes/";
import { ToastProvider } from "./shared/providers";
import { AuthProvider } from "./features/auth/context/AuthContext";

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
