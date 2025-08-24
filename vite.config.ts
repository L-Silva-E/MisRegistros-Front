import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "chakra-ui": [
            "@chakra-ui/react",
            "@chakra-ui/icons",
            "@chakra-ui/theme",
            "@chakra-ui/system",
            "@chakra-ui/styled-system",
          ],
          "react-router": [
            "react-router-dom",
            "react-router",
            "@remix-run/router",
          ],
          "react-forms": ["react-hook-form"],
          "react-icons": ["react-icons/fa", "react-icons/fi", "react-icons/md"],
          animations: ["framer-motion"],
          "http-utils": ["axios"],
          "recipe-forms": ["./src/shared/components/forms/RecipeForm"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
