import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || "/", // Set base path dynamically
    define: {
      "process.env": env, // Expose env variables globally
    },
    build: {
      outDir: "build",
      assetsDir: "assets",
      emptyOutDir: true,
      sourcemap: mode === "development", // Enable sourcemaps in development
      minify: mode === "production" ? "esbuild" : false, // Minify only in production
    },
  };
});
