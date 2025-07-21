import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

/// <reference types="vitest/config" />
import { defineConfig } from "vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
            routeFileIgnorePattern: ".test.(ts|tsx)",
        }),
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
            "@mocks": resolve(import.meta.dirname, "./mocks"),
            "@models": resolve(import.meta.dirname, "./src/models"),
            "@rest-api": resolve(import.meta.dirname, "./src/rest-api"),
            "@store": resolve(import.meta.dirname, "./src/store"),
            "@tests": resolve(import.meta.dirname, "./src/tests"),
        },
    },
});
