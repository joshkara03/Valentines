import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    host: process.env.TEMPO === "true" ? "0.0.0.0" : undefined,
  },
  build: {
    // Vercel (and some other deploy targets) enforce a 10MB request/body limit during upload.
    // These large photo/heic assets can inflate the build output significantly.
    // Raising this limit helps prevent "Request body too large" deploy failures.
    chunkSizeWarningLimit: 5000,
    assetsInlineLimit: 0,
  },
});
