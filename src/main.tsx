import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import customTheme from "./themes/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <App />
    </React.StrictMode>
  </ChakraProvider>
);
