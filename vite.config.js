import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      "/api": {
        target: "https://ecommerce.routemisr.com",
        changeOrigin: true,
        // This removes the '/api' prefix before sending to the real server
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
    },
  },
});
