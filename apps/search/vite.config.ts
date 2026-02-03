import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  optimizeDeps: {
    exclude: ["@repo/ui"],
  },
  server: {
    watch: {
      ignored: ["!**/node_modules/@repo/ui/**"],
    },
  },
});
