/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    resolve: {
        mainFields: ["module", "main"],
        alias: {
            "@assets": "/src/assets",
            "@pages": "/src/pages",
            "@components": "/src/components",
            "@hooks": "/src/hooks",
            "@mocks": "/mocks",
            "@models": "/src/models",
            "@store": "/src/store",
            "@tests": "/tests",
            "@utils": "/src/utils",
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ["node_modules/@syncfusion"],
            },
        },
    },
    test: {
        // ...
        globals: true,
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
    },
});
