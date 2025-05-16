import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [
        TanStackRouterVite({ autoCodeSplitting: true, routeFileIgnorePattern: ".test.(ts|tsx)" }),
        react(),
        tailwindcss(),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./src/setupTests.ts",
    },
    resolve: {
        mainFields: ["module", "main"],
        alias: {
            "@assets": resolve(import.meta.dirname, "./src/assets"),
            "@components": resolve(import.meta.dirname, "./src/components"),
            "@integrations": resolve(import.meta.dirname, "./src/integrations"),
            "@mocks": resolve(import.meta.dirname, "./src/mocks"),
            "@models": resolve(import.meta.dirname, "./src/models"),
            "@rest-api": resolve(import.meta.dirname, "./src/rest-api"),
            "@store": resolve(import.meta.dirname, "./src/store"),
            "@tests": resolve(import.meta.dirname, "./src/tests"),
        },
    },
});
