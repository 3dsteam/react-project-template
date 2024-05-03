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
