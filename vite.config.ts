import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

/// <reference types="vitest/config" />
import { defineConfig } from "vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
import fs from "node:fs";

import pkg from "./package.json";

export default defineConfig({
    plugins: [
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
            routeFileIgnorePattern: ".test.(ts|tsx)",
        }),
        react(),
        tailwindcss(),
        // Building version.json
        {
            name: "Build version.json",
            buildStart() {
                // Update version.json with the current package version and timestamp
                fs.writeFileSync(
                    "./public/version.json",
                    JSON.stringify({ version: pkg.version, ts: Date.now() }, null, 2)
                );
            }
        }
    ],
    resolve: {
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
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
    },
});
