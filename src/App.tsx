import "./App.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import router from "./app/routes/";
import customTheme from "./shared/themes/";
import { ToastProvider } from "./shared/providers";

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ChakraProvider>
  );
};

export default App;
