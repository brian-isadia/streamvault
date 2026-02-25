import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// logic to limit workers based on my pc specs
const cpuCount = 2; // Limit to 2 to keep system responsive

const config = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
  ],
  server: {
    // Limits the number of file watchers and processing threads
    watch: {
      usePolling: false, // Set to true only if HMR fails on your HDD
      // Don't track these to save CPU/RAM
      ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    },
  },
  build: {
    // This is where memory-saving sourcemap settings live
    sourcemap: false, // Disabling this saves massive RAM during build
    rollupOptions: {
      // Logic to limit workers: This actually uses the cpuCount variable
      maxParallelFileOps: cpuCount,
    },
  },
  worker: {
    format: "es",
    plugins: () => [viteReact()],
  },
  // Ensure we don't spawn too many processes
  optimizeDeps: {
    force: false, // Only re-bundle when dependencies change
  },
});

export default config;
