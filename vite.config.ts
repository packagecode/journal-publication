import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  define: {},
  build: {
    rollupOptions: {
      output: {
        // Custom filenames for JS
        entryFileNames: "js/app.js",
        chunkFileNames: "js/app.chunk.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && (assetInfo.name as string).endsWith(".css")) {
            return "css/[name].css";
          }
          return "assets/[name]-[hash][extname]";
        },
        manualChunks: (id) => {
          // Disable splitting chunks
          return "everything.js";
        },
      },
    },
    cssCodeSplit: false, // This disables CSS code splitting
    chunkSizeWarningLimit: 3000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
