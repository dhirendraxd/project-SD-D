import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@firebase/analytics")) return "firebase-analytics";
            if (id.includes("@firebase/auth")) return "firebase-auth";
            if (id.includes("@firebase/firestore")) return "firebase-firestore";
            if (id.includes("@firebase/storage")) return "firebase-storage";
            if (id.includes("@firebase/app")) return "firebase-app";
            if (id.includes("@firebase/util")) return "firebase-util";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("firebase")) return "firebase";
            if (id.includes("react-dom") || id.includes("react")) return "react";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("@tanstack")) return "query";
            if (id.includes("sonner")) return "toast";
            if (id.includes("lucide-react")) return "icons";
            return "vendor";
          }
        },
      },
    },
  },
}));
