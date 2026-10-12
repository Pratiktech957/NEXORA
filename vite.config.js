import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  assetsInclude: ["**/*.glb", "**/*.gltf"],

  server: {
    watch: {
      ignored: ["**/public/model/**"],
    },

    // Local dev proxy for the JARVIS chatbot serverless function.
    //
    // Two ways to run this locally:
    //
    //  1. RECOMMENDED — `vercel dev` (see below). Vercel serves your Vite
    //     build AND `api/chat.js` on the same origin, so this proxy is
    //     never hit and `fetch("/api/chat")` just works.
    //
    //  2. Vite-only — run a tiny local handler on http://localhost:3001
    //     (e.g. `node dev-api.js`) and this proxy will forward `/api/*`
    //     to it. Only used if you don't want to install the Vercel CLI.
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});