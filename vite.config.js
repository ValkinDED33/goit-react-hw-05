import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 Добавь это для корректной работы на Vercel
  define: {
    "process.env": {},
  },
  build: {
    outDir: "dist", // 👈 Убедись, что Vercel берет файлы отсюда
    sourcemap: true,
  },
});
