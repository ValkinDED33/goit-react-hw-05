import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    "process.env": {},
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
