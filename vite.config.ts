import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "client"), // Set the root to the client directory
  base: "/", // Set base path for deployment
  plugins: [
    react(),
    runtimeErrorOverlay(), // Optional: shows runtime errors in-browser
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5181, // ✅ Frontend dev server
    fs: {
      strict: true,
      deny: ["**/.*"], // Prevent access to hidden files
    },
    proxy: {
      "/api": {
        target: "http://localhost:5008", // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
