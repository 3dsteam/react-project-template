import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": "/src/assets",
            "@pages": "/src/pages",
            "@components": "/src/components",
            "@models": "/src/models",
            "@msw": "/msw",
            "@store": "/src/store",
            "@tests": "/tests",
            "@utils": "/src/utils",
        },
    },
    test: {
        // ...
        globals: true,
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
    },
});
