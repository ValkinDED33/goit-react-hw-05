import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  base: "/",
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
