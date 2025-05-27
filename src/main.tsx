import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import customTheme from "./themes/index.ts";
import router from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      {/* <App /> */}
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
