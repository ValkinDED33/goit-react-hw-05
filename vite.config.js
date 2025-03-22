import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/", // Измени, если деплоишь в подкаталог (например, "/my-app/")
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5173,
    open: true,
    strictPort: true, // Если порт занят, Vite не переключится на другой
    middlewareMode: false, // 🔄 Убедимся, что Vite правильно обрабатывает маршруты
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
