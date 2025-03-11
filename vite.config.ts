import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // 빈 객체로 대체
  },
  server: {
    proxy: {
      "/api": {
        target: "http://15.164.154.120:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
