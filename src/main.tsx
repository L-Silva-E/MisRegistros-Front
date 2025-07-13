import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import router from "./app/routes/";
import customTheme from "./shared/themes/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
